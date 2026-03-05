import { Component, OnInit } from '@angular/core';
import { ArtifactDetailsDto } from 'src/app/models/dtos/artifactDetailsDto';
import { ArtifactService } from 'src/app/services/artifact.service';
import { allTranslates } from 'src/app/services/translation.service';
import { SettingsService } from 'src/app/services/settings.service';

type TransportMode = 'walking' | 'driving' | 'public';

interface DurationOption {
  id: string;
  days: number;
  label: string;
}

interface TransportOption {
  id: TransportMode;
  label: string;
}

interface RegionOption {
  id: string;
  label: string;
  description: string;
  center?:
    | {
        lat: number;
        lng: number;
      }
    | undefined;
  radiusKm?: number;
}

@Component({
  selector: 'app-route-planner',
  templateUrl: './route-planner.component.html',
  styleUrls: ['./route-planner.component.css'],
})
export class RoutePlannerComponent implements OnInit {
  artifacts: ArtifactDetailsDto[] = [];
  candidateArtifacts: ArtifactDetailsDto[] = [];

  durationOptions: DurationOption[] = [
    { id: '1d', days: 1, label: '1 Günlük Gezi' },
    { id: '3d', days: 3, label: '3 Günlük Gezi' },
    { id: '5d', days: 5, label: '5 Günlük Gezi' },
  ];

  transportOptions: TransportOption[] = [
    { id: 'walking', label: 'Yaya' },
    { id: 'driving', label: 'Araç' },
    { id: 'public', label: 'Toplu Taşıma' },
  ];

  regionOptions: RegionOption[] = [
    {
      id: 'center',
      label: 'Merkez',
      description: 'Merkezdeki tarihi eserler',
      // Konya merkez için yaklaşık bir nokta
      center: {
        lat: 37.8715,
        lng: 32.4848,
      },
      radiusKm: 5, // 5 km yarıçap içinde kalanlar merkez sayılır
    },
    {
      id: 'sille',
      label: 'Sille',
      description: 'Sille bölgesindeki eserler',
      // Sille için yaklaşık merkez noktası
      center: {
        lat: 37.9336,
        lng: 32.3948,
      },
      radiusKm: 4, // 4 km yarıçap içinde kalanlar Sille sayılır
    },
    {
      id: 'all',
      label: 'Tüm Konya',
      description: 'Bölge ayrımı olmadan tüm eserler',
    },
  ];

  selectedDurationId: string = this.durationOptions[0].id;
  selectedTransportId: TransportMode = this.transportOptions[0].id;
  selectedRegionId: string = 'center';

  loading = false;
  routes: ArtifactDetailsDto[][] = [];
  segmentDistancesKmList: number[][] = [];
  totalDistanceKmList: number[] = [];
  selectedRouteIndex = 0;
  errorMessage: string | null = null;

  // Yaklaşık toplu taşıma durakları (tramvay / otobüs) - gerektiğinde güncellenebilir
  private transitStops = [
    // Alaaddin civarı
    { lat: 37.8712, lng: 32.4826 },
    // Zafer
    { lat: 37.8719, lng: 32.4895 },
    // Belediye
    { lat: 37.8766, lng: 32.4953 },
    // Otogar tarafı (örnek)
    { lat: 37.9235, lng: 32.505 },
  ];

  constructor(
    private artifactService: ArtifactService,
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    this.loadArtifacts();
  }

  loadArtifacts(): void {
    this.loading = true;
    this.artifactService.getAllDetailsAndDefaultImages().subscribe(
      (response) => {
        this.artifacts = response.data;
        this.candidateArtifacts = this.artifacts.filter(
          (a) => !!a.artifact.latitude && !!a.artifact.longitude
        );
        this.loading = false;
      },
      () => {
        this.loading = false;
        this.errorMessage =
          'Eserler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.';
      }
    );
  }

  get hasCoordinateData(): boolean {
    return this.candidateArtifacts && this.candidateArtifacts.length > 0;
  }

  generateRoute(): void {
    this.errorMessage = null;

    if (!this.hasCoordinateData) {
      this.errorMessage =
        'Sistemde konum bilgisi bulunan yeterli eser bulunamadı.';
      this.routes = [];
      this.segmentDistancesKmList = [];
      this.totalDistanceKmList = [];
      return;
    }

    const regionArtifacts = this.filterByRegion(
      this.candidateArtifacts,
      this.selectedRegionId
    );

    if (!regionArtifacts.length) {
      this.errorMessage =
        'Seçilen bölge için konum bilgisi bulunan eser bulunamadı.';
      this.routes = [];
      this.segmentDistancesKmList = [];
      this.totalDistanceKmList = [];
      return;
    }

    const duration = this.durationOptions.find(
      (d) => d.id === this.selectedDurationId
    )!;
    // Ulaşım tipine göre eserleri filtrele (yaya / toplu taşıma için ek kısıtlar)
    const transportFiltered = this.filterByTransport(
      regionArtifacts,
      this.selectedTransportId
    );

    const workingArtifacts =
      transportFiltered.length >= 2 ? transportFiltered : regionArtifacts;

    const maxStops = this.getMaxStops(
      duration.days,
      this.selectedTransportId,
      workingArtifacts.length
    );

    const alternativesCount = 3;
    this.routes = this.buildAlternativeRoutes(
      workingArtifacts,
      maxStops,
      alternativesCount
    );

    this.segmentDistancesKmList = this.routes.map((r) =>
      this.calculateSegmentDistances(r)
    );
    this.totalDistanceKmList = this.segmentDistancesKmList.map((segments) =>
      segments.reduce((acc, d) => acc + d, 0)
    );
    this.selectedRouteIndex = 0;
  }

  get selectedRegionDescription(): string {
    const region = this.regionOptions.find(
      (r) => r.id === this.selectedRegionId
    );
    return region?.description ?? '';
  }

  get currentRoute(): ArtifactDetailsDto[] {
    if (!this.routes || this.routes.length === 0) {
      return [];
    }
    return this.routes[this.selectedRouteIndex] || this.routes[0];
  }

  changeRoute(index: number): void {
    if (index >= 0 && index < this.routes.length) {
      this.selectedRouteIndex = index;
    }
  }

  getCurrentRouteTotalDistance(): number {
    if (!this.totalDistanceKmList.length) {
      return 0;
    }
    return this.totalDistanceKmList[this.selectedRouteIndex] ?? 0;
  }

  getMaxStops(
    days: number,
    mode: TransportMode,
    availableCount: number
  ): number {
    const baseByMode: Record<TransportMode, number> = {
      walking: 4,
      driving: 10,
      public: 7,
    };

    const incrementByMode: Record<TransportMode, number> = {
      walking: 3,
      driving: 6,
      public: 4,
    };

    const base = baseByMode[mode];
    const increment = incrementByMode[mode];

    const max = base + (days - 1) * increment;

    return Math.min(max, availableCount);
  }

  filterByRegion(
    artifacts: ArtifactDetailsDto[],
    regionId: string
  ): ArtifactDetailsDto[] {
    const region = this.regionOptions.find((r) => r.id === regionId);
    if (!region || !region.center || !region.radiusKm) {
      return artifacts;
    }

    const { lat: centerLat, lng: centerLng } = region.center;
    const radius = region.radiusKm;

    return artifacts.filter((a) => {
      const lat = a.artifact.latitude;
      const lng = a.artifact.longitude;
      if (lat == null || lng == null) {
        return false;
      }
      const d = this.haversine(centerLat, centerLng, lat, lng);
      return d <= radius;
    });
  }

  /**
   * Ulaşım tipine göre ek filtreleme:
   * - walking: merkez çevresindeki ve birbirine yakın eserler
   * - public: tramvay / otobüs duraklarına yakın eserler
   * - driving: ek kısıt yok
   */
  filterByTransport(
    artifacts: ArtifactDetailsDto[],
    mode: TransportMode
  ): ArtifactDetailsDto[] {
    if (mode === 'driving') {
      return artifacts;
    }

    if (mode === 'walking') {
      const center = this.getApproximateCenter(artifacts);
      const MAX_RADIUS_KM = 2.0;

      return artifacts.filter((a) => {
        const d = this.distanceBetween(center, a);
        return d <= MAX_RADIUS_KM;
      });
    }

    // public (toplu taşıma): duraklara yakın eserler
    const MAX_TRANSIT_DISTANCE_KM = 0.6;

    const scored = artifacts
      .map((a) => {
        const d = this.getNearestTransitDistance(a);
        return { artifact: a, distanceToTransit: d };
      })
      .filter((x) => x.distanceToTransit <= MAX_TRANSIT_DISTANCE_KM);

    // Duraklara yakın olanları, duraklara yakınlığa göre sırala
    scored.sort((a, b) => a.distanceToTransit - b.distanceToTransit);

    return scored.map((x) => x.artifact);
  }

  buildAlternativeRoutes(
    artifacts: ArtifactDetailsDto[],
    maxStops: number,
    count: number
  ): ArtifactDetailsDto[][] {
    const routes: ArtifactDetailsDto[][] = [];
    if (!artifacts.length) {
      return routes;
    }

    const center = this.getApproximateCenter(artifacts);
    const sortedByCenter = [...artifacts].sort(
      (a, b) =>
        this.distanceBetween(center, a) - this.distanceBetween(center, b)
    );

    const seedCandidates = sortedByCenter.slice(
      0,
      Math.min(10, sortedByCenter.length)
    );

    for (let i = 0; i < count; i++) {
      const seed = seedCandidates[i % seedCandidates.length];
      const route = this.buildNearestNeighborRoute(
        artifacts,
        maxStops,
        seed.artifact.id
      );

      if (route.length >= 2 && !this.routeAlreadyExists(routes, route)) {
        routes.push(route);
      }
    }

    if (!routes.length) {
      const fallback = this.buildNearestNeighborRoute(artifacts, maxStops);
      if (fallback.length) {
        routes.push(fallback);
      }
    }

    return routes;
  }

  routeAlreadyExists(
    existingRoutes: ArtifactDetailsDto[][],
    newRoute: ArtifactDetailsDto[]
  ): boolean {
    const newIds = newRoute.map((a) => a.artifact.id).join('-');
    return existingRoutes.some(
      (r) => r.map((a) => a.artifact.id).join('-') === newIds
    );
  }

  buildNearestNeighborRoute(
    artifacts: ArtifactDetailsDto[],
    maxStops: number,
    startArtifactId?: number
  ): ArtifactDetailsDto[] {
    if (!artifacts.length || maxStops <= 0) {
      return [];
    }

    let remaining = [...artifacts];
    const route: ArtifactDetailsDto[] = [];
    let current: ArtifactDetailsDto;

    if (startArtifactId) {
      const startIndex = remaining.findIndex(
        (a) => a.artifact.id === startArtifactId
      );
      if (startIndex >= 0) {
        current = remaining[startIndex];
        remaining.splice(startIndex, 1);
      } else {
        const center = this.getApproximateCenter(artifacts);
        remaining.sort(
          (a, b) =>
            this.distanceBetween(center, a) - this.distanceBetween(center, b)
        );
        current = remaining.shift()!;
      }
    } else {
      const center = this.getApproximateCenter(artifacts);
      remaining.sort(
        (a, b) =>
          this.distanceBetween(center, a) - this.distanceBetween(center, b)
      );
      current = remaining.shift()!;
    }

    route.push(current);

    const MAX_STEP_DISTANCE_WALKING_KM = 1.5;

    while (route.length < maxStops && remaining.length > 0) {
      remaining.sort(
        (a, b) =>
          this.distanceBetween(current, a) - this.distanceBetween(current, b)
      );
      current = remaining.shift()!;
      // Yaya modunda, bir sonraki durak çok uzaksa eklemeyi bırak
      if (
        this.selectedTransportId === 'walking' &&
        this.distanceBetween(route[route.length - 1], current) >
          MAX_STEP_DISTANCE_WALKING_KM
      ) {
        break;
      }

      route.push(current);
    }

    return route;
  }

  getApproximateCenter(
    artifacts: ArtifactDetailsDto[]
  ): { latitude: number; longitude: number } {
    const coords = artifacts
      .filter((a) => a.artifact.latitude && a.artifact.longitude)
      .map((a) => ({
        lat: a.artifact.latitude as number,
        lng: a.artifact.longitude as number,
      }));

    const avgLat =
      coords.reduce((sum, c) => sum + c.lat, 0) / (coords.length || 1);
    const avgLng =
      coords.reduce((sum, c) => sum + c.lng, 0) / (coords.length || 1);

    return { latitude: avgLat, longitude: avgLng };
  }

  calculateSegmentDistances(route: ArtifactDetailsDto[]): number[] {
    const distances: number[] = [];

    for (let i = 0; i < route.length - 1; i++) {
      const d = this.distanceBetween(route[i], route[i + 1]);
      distances.push(d);
    }

    return distances;
  }

  distanceBetween(
    a:
      | ArtifactDetailsDto
      | { latitude: number; longitude: number },
    b: ArtifactDetailsDto
  ): number {
    const aLat =
      'artifact' in a ? (a.artifact.latitude as number) : a.latitude;
    const aLng =
      'artifact' in a ? (a.artifact.longitude as number) : a.longitude;
    const bLat = b.artifact.latitude as number;
    const bLng = b.artifact.longitude as number;

    return this.haversine(aLat, aLng, bLat, bLng);
  }

  haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const toRad = (v: number) => (v * Math.PI) / 180;
    const R = 6371; // km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  getArtifactName(artifact: ArtifactDetailsDto): string {
    return (
      this.getTranslate(artifact.artifact.name) ?? artifact.artifact.name
    );
  }

  getTranslate(key: string): string | undefined {
    return allTranslates.get(key);
  }

  getCurrentLanguageShortCode(): string {
    return this.settingsService.getCurrentLanguageShortCode();
  }

  getArtifactLink(artifact: ArtifactDetailsDto): any[] {
    const lang = this.getCurrentLanguageShortCode();
    return [
      '/' + lang,
      'konya-kitabeleri',
      artifact.historicalPeriod.paramName,
      artifact.artifactType.id,
      artifact.artifact.id,
    ];
  }

  private getLatLng(artifact: ArtifactDetailsDto): {
    lat: number;
    lng: number;
  } {
    return {
      lat: artifact.artifact.latitude as number,
      lng: artifact.artifact.longitude as number,
    };
  }

  getMapUrlForCurrentRoute(): string | null {
    const route = this.currentRoute;
    if (!route || route.length < 2) {
      return null;
    }

    const parts = route.map((a) => {
      const { lat, lng } = this.getLatLng(a);
      return `${lat},${lng}`;
    });

    const path = parts.join('/');

    return `https://www.google.com/maps/dir/${path}/`;
  }

  private getNearestTransitDistance(artifact: ArtifactDetailsDto): number {
    const { lat, lng } = this.getLatLng(artifact);
    let min = Number.POSITIVE_INFINITY;

    for (const stop of this.transitStops) {
      const d = this.haversine(lat, lng, stop.lat, stop.lng);
      if (d < min) {
        min = d;
      }
    }

    return min;
  }
}

