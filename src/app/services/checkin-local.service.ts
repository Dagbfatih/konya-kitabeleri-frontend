// checkin-local.service.ts - LocalStorage ile çalışan servis

import { Injectable } from '@angular/core';

interface Visit {
  artifactId: number;
  artifactName: string;
  visitDate: string;
  pointsEarned: number;
  latitude: number;
  longitude: number;
}

interface UserPoints {
  totalPoints: number;
  visitedCount: number;
  visits: Visit[];
  achievements: string[];
}

@Injectable({
  providedIn: 'root'
})
export class CheckinLocalService {
  private STORAGE_KEY = 'konya_kitabeler_visits';
  private POINTS_PER_VISIT = 10;

  constructor() {}

  // Kullanıcının tüm verilerini al
  private getUserData(): UserPoints {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (!data) {
      return {
        totalPoints: 0,
        visitedCount: 0,
        visits: [],
        achievements: []
      };
    }
    return JSON.parse(data);
  }

  // Verileri kaydet
  private saveUserData(data: UserPoints): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  // Check-in yap
  checkIn(artifactId: number, artifactName: string, latitude: number, longitude: number): { success: boolean, pointsEarned: number, message: string } {
    const userData = this.getUserData();

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

    this.saveUserData(userData);

    return {
      success: true,
      pointsEarned: this.POINTS_PER_VISIT,
      message: 'Ziyaret kaydedildi! 🎉'
    };
  }

  // Bu eseri ziyaret etmiş mi?
  hasVisited(artifactId: number): boolean {
    const userData = this.getUserData();
    return userData.visits.some(v => v.artifactId === artifactId);
  }

  // Kullanıcının puanlarını al
  getUserPoints(): UserPoints {
    return this.getUserData();
  }

  // Son ziyaretleri al
  getRecentVisits(limit: number = 10): Visit[] {
    const userData = this.getUserData();
    return userData.visits
      .sort((a, b) => new Date(b.visitDate).getTime() - new Date(a.visitDate).getTime())
      .slice(0, limit);
  }

  // Başarımları kontrol et
  private checkAchievements(userData: UserPoints): Array<{ id: string, name: string, points: number }> {
    const newAchievements: Array<{ id: string, name: string, points: number }> = [];

    // İlk ziyaret
    if (userData.visitedCount === 1 && !userData.achievements.includes('first_visit')) {
      newAchievements.push({
        id: 'first_visit',
        name: 'İlk Adım',
        points: 25
      });
    }

    // 5 eser
    if (userData.visitedCount === 5 && !userData.achievements.includes('visit_5')) {
      newAchievements.push({
        id: 'visit_5',
        name: 'Meraklı Gezgin',
        points: 50
      });
    }

    // 10 eser
    if (userData.visitedCount === 10 && !userData.achievements.includes('visit_10')) {
      newAchievements.push({
        id: 'visit_10',
        name: 'Tarih Aşığı',
        points: 100
      });
    }

    // 25 eser
    if (userData.visitedCount === 25 && !userData.achievements.includes('visit_25')) {
      newAchievements.push({
        id: 'visit_25',
        name: 'Kültür Elçisi',
        points: 250
      });
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
      { name: 'Tarih Uzmanı', minPoints: 2500, color: '#fd7e14' },
      { name: 'Miras Ustası', minPoints: 5000, color: '#6f42c1' }
    ];

    for (let i = ranks.length - 1; i >= 0; i--) {
      if (totalPoints >= ranks[i].minPoints) {
        return ranks[i];
      }
    }

    return ranks[0];
  }

  // Tüm verileri sıfırla (test için)
  resetAllData(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}