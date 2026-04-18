import { Component, OnInit } from '@angular/core';
import { CheckinFirebaseService, UserPoints } from 'src/app/services/checkin-firebase.service';
import { SettingsService } from 'src/app/services/settings.service';
import { faTrophy, faStar, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-stats',
  templateUrl: './user-stats.component.html',
  styleUrls: ['./user-stats.component.css']
})
export class UserStatsComponent implements OnInit {
  faTrophy = faTrophy;
  faStar = faStar;
  faMapMarkedAlt = faMapMarkedAlt;

  userPoints: any;
  currentRank: any;
  nextRank: any;
  recentVisits: any[] = [];
  progressPercent: number = 0;
  pointsToNextRank: number = 0;
  
  allRanks = [
    { name: 'Acemi Gezgin', minPoints: 0, color: '#6c757d' },
    { name: 'Tarih Meraklısı', minPoints: 100, color: '#28a745' },
    { name: 'Kültür Elçisi', minPoints: 500, color: '#17a2b8' },
    { name: 'Miras Koruyucusu', minPoints: 1000, color: '#ffc107' },
    { name: 'Tarih Sevdalısı', minPoints: 2500, color: '#fd7e14' },
    { name: 'Miras Ustası', minPoints: 5000, color: '#6f42c1' }
  ];

  constructor(
    private checkinService: CheckinFirebaseService,
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  async loadUserData() {
    this.userPoints = await this.checkinService.getUserData();
    if(!this.userPoints) {
       // Not logged in or error
       return;
    }
    this.currentRank = this.checkinService.getRank(this.userPoints.totalPoints);
    this.recentVisits = await this.checkinService.getRecentVisits(10);

    // Bir sonraki rütbeyi bul
    const currentRankIndex = this.allRanks.findIndex(r => r.name === this.currentRank.name);
    if (currentRankIndex < this.allRanks.length - 1) {
      this.nextRank = this.allRanks[currentRankIndex + 1];
      this.pointsToNextRank = this.nextRank.minPoints - this.userPoints.totalPoints;
      
      // İlerleme yüzdesi
      const currentMin = this.currentRank.minPoints;
      const nextMin = this.nextRank.minPoints;
      const range = nextMin - currentMin;
      const progress = this.userPoints.totalPoints - currentMin;
      this.progressPercent = Math.min(100, (progress / range) * 100);
    } else {
      // Son rütbedeyse
      this.nextRank = { name: 'Maksimum Seviye!', minPoints: this.currentRank.minPoints };
      this.pointsToNextRank = 0;
      this.progressPercent = 100;
    }
  }

  resetData() {
    if (confirm('Tüm verileriniz silinecek (Henüz Firebase silme entegre değil). Emin misiniz?')) {
      // this.checkinService.resetAllData();
      alert('Firebase üzerinden sıfırlama işlemi manuel yapılmalıdır.');
    }
  }

  getCurrentLanguageShortCode(): string {
    return this.settingsService.getCurrentLanguageShortCode();
  }
}