import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  arrayUnion,
  increment,
  Firestore 
} from 'firebase/firestore';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';

export interface Visit {
  artifactId: number;
  artifactName: string;
  visitDate: string;
  pointsEarned: number;
  latitude: number;
  longitude: number;
}

export interface UserPoints {
  totalPoints: number;
  visitedCount: number;
  visits: Visit[];
  achievements: string[];
}

@Injectable({
  providedIn: 'root'
})
export class CheckinFirebaseService {
  private db: Firestore;
  private POINTS_PER_VISIT = 10;
  
  constructor(private tokenService: TokenService) {
    // Initialize Firebase
    if(environment.firebase && environment.firebase.apiKey !== 'YOUR_API_KEY') {
        const app = initializeApp(environment.firebase, 'KonyaKitabeleriApp');
        this.db = getFirestore(app);
    }
  }

  private getCurrentUserId(): string | null {
    const user = this.tokenService.getUserWithJWT();
    if(user && user.id) {
        return user.id.toString();
    }
    return null;
  }

  // Kullanıcının tüm verilerini al
  async getUserData(): Promise<UserPoints | null> {
    const userId = this.getCurrentUserId();
    if(!userId || !this.db) return null;

    const docRef = doc(this.db, "user_points", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as UserPoints;
    } else {
      // Return default
      return {
        totalPoints: 0,
        visitedCount: 0,
        visits: [],
        achievements: []
      };
    }
  }

  // Check-in yap
  async checkIn(artifactId: number, artifactName: string, latitude: number, longitude: number): Promise<{ success: boolean, pointsEarned: number, message: string }> {
    const userId = this.getCurrentUserId();
    if(!userId || !this.db) {
        return { success: false, pointsEarned: 0, message: 'Lütfen check-in yapmak için giriş yapın.' };
    }

    const docRef = doc(this.db, "user_points", userId);
    const docSnap = await getDoc(docRef);
    
    let userData: UserPoints;
    
    if(!docSnap.exists()) {
        userData = { totalPoints: 0, visitedCount: 0, visits: [], achievements: [] };
    } else {
        userData = docSnap.data() as UserPoints;
    }

    // Daha önce ziyaret edilmiş mi?
    const alreadyVisited = userData.visits.some(v => v.artifactId === artifactId);
    if (alreadyVisited) {
      return {
        success: false,
        pointsEarned: 0,
        message: 'Bu eseri zaten ziyaret ettiniz!'
      };
    }

    // Yeni ziyaret ekle
    const newVisit: Visit = {
      artifactId,
      artifactName,
      visitDate: new Date().toISOString(),
      pointsEarned: this.POINTS_PER_VISIT,
      latitude,
      longitude
    };

    userData.visits.push(newVisit);
    userData.visitedCount++;
    userData.totalPoints += this.POINTS_PER_VISIT;

    // Başarımları kontrol et
    const achievements = this.checkAchievements(userData);
    if (achievements.length > 0) {
      userData.totalPoints += achievements.reduce((sum, a) => sum + a.points, 0);
      achievements.forEach(a => {
        if (!userData.achievements.includes(a.id)) {
          userData.achievements.push(a.id);
        }
      });
    }

    await setDoc(docRef, userData, { merge: true });

    return {
      success: true,
      pointsEarned: this.POINTS_PER_VISIT,
      message: 'Ziyaret kaydedildi! 🎉'
    };
  }

  // Bu eseri ziyaret etmiş mi?
  async hasVisited(artifactId: number): Promise<boolean> {
    const userData = await this.getUserData();
    if(!userData) return false;
    return userData.visits.some((v: Visit) => v.artifactId === artifactId);
  }

  // Son ziyaretleri al
  async getRecentVisits(limit: number = 10): Promise<Visit[]> {
    const userData = await this.getUserData();
    if(!userData) return [];
    return userData.visits
      .sort((a: Visit, b: Visit) => new Date(b.visitDate).getTime() - new Date(a.visitDate).getTime())
      .slice(0, limit);
  }

  // Başarımları kontrol et
  private checkAchievements(userData: UserPoints): Array<{ id: string, name: string, points: number }> {
    const newAchievements: Array<{ id: string, name: string, points: number }> = [];

    if (userData.visitedCount === 1 && !userData.achievements.includes('first_visit')) {
      newAchievements.push({ id: 'first_visit', name: 'İlk Adım', points: 25 });
    }
    if (userData.visitedCount === 5 && !userData.achievements.includes('visit_5')) {
      newAchievements.push({ id: 'visit_5', name: 'Meraklı Gezgin', points: 50 });
    }
    if (userData.visitedCount === 10 && !userData.achievements.includes('visit_10')) {
      newAchievements.push({ id: 'visit_10', name: 'Tarih Aşığı', points: 100 });
    }
    if (userData.visitedCount === 25 && !userData.achievements.includes('visit_25')) {
      newAchievements.push({ id: 'visit_25', name: 'Kültür Elçisi', points: 250 });
    }

    return newAchievements;
  }

  // Rütbe hesapla
  getRank(totalPoints: number): { name: string, color: string, minPoints: number } {
    const ranks = [
      { name: 'Acemi Gezgin', minPoints: 0, color: '#6c757d' },
      { name: 'Tarih Meraklısı', minPoints: 100, color: '#28a745' },
      { name: 'Kültür Elçisi', minPoints: 500, color: '#17a2b8' },
      { name: 'Miras Koruyucusu', minPoints: 1000, color: '#ffc107' },
      { name: 'Tarih Sevdalısı', minPoints: 2500, color: '#fd7e14' },
      { name: 'Miras Ustası', minPoints: 5000, color: '#6f42c1' }
    ];

    for (let i = ranks.length - 1; i >= 0; i--) {
      if (totalPoints >= ranks[i].minPoints) {
        return ranks[i];
      }
    }
    return ranks[0];
  }
}
