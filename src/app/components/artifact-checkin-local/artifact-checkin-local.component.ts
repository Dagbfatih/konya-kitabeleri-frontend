import { Component, Input, OnInit } from '@angular/core';
import { ArtifactDetailsDto } from 'src/app/models/dtos/artifactDetailsDto';
import { CheckinLocalService } from 'src/app/services/checkin-local.service';
import { ToastrService } from 'ngx-toastr';
import { faMapMarkerAlt, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-artifact-checkin-local',
  templateUrl: './artifact-checkin-local.component.html',
  styleUrls: ['./artifact-checkin-local.component.css']
})
export class ArtifactCheckinLocalComponent implements OnInit {
  @Input() artifact: ArtifactDetailsDto;
  
  faMapMarkerAlt = faMapMarkerAlt;
  faCheckCircle = faCheckCircle;
  
  isCheckinInProgress = false;
  isAlreadyVisited = false;
  
  MAX_DISTANCE_METERS = 100;

  constructor(
    private checkinService: CheckinLocalService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.checkIfAlreadyVisited();
  }

  checkIfAlreadyVisited() {
    this.isAlreadyVisited = this.checkinService.hasVisited(this.artifact.artifact.id!);
  }

  async checkIn() {
    this.isCheckinInProgress = true;

    try {
      // Kullanıcının konumunu al
      const position = await this.getUserLocation();
      const userLat = position.coords.latitude;
      const userLon = position.coords.longitude;

      // Eser konumu var mı kontrol et
      if (!this.artifact.artifact.latitude || !this.artifact.artifact.longitude) {
        this.toastrService.warning('Bu eserin konum bilgisi mevcut değil', 'Konum Hatası');
        this.isCheckinInProgress = false;
        return;
      }

      // Mesafe hesapla
      const distance = this.calculateDistance(
        userLat,
        userLon,
        this.artifact.artifact.latitude!,
        this.artifact.artifact.longitude!
      );

      console.log('Distance to artifact:', Math.round(distance), 'meters');

      if (distance > this.MAX_DISTANCE_METERS) {
        this.toastrService.error(
          `Eserin ${this.MAX_DISTANCE_METERS} metre yakınında olmalısınız. Mesafe: ${Math.round(distance)}m`,
          'Çok Uzaksınız'
        );
        this.isCheckinInProgress = false;
        return;
      }

      // Check-in yap
      const result = this.checkinService.checkIn(
        this.artifact.artifact.id!,
        this.artifact.artifact.name,
        userLat,
        userLon
      );

      if (result.success) {
        this.isAlreadyVisited = true;
        this.toastrService.success(
          `🎉 +${result.pointsEarned} puan kazandınız!`,
          result.message
        );
        
        // Toplam puanı göster
        const userData = this.checkinService.getUserPoints();
        const rank = this.checkinService.getRank(userData.totalPoints);
        
        setTimeout(() => {
          this.toastrService.info(
            `Toplam: ${userData.totalPoints} puan - Rütbe: ${rank.name}`,
            'İstatistikler'
          );
        }, 1000);
      } else {
        this.toastrService.info(result.message, 'Ziyaret Kaydı');
      }

    } catch (error) {
      console.error('Location error:', error);
      this.toastrService.error(
        'Konum bilgisi alınamadı. Lütfen konum izni verin.',
        'Konum Hatası'
      );
    } finally {
      this.isCheckinInProgress = false;
    }
  }

  private getUserLocation(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Tarayıcınız konum hizmetlerini desteklemiyor'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error),
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    });
  }

  // Haversine formülü - İki koordinat arası mesafe (metre)
  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371e3; // Dünya yarıçapı (metre)
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }
}