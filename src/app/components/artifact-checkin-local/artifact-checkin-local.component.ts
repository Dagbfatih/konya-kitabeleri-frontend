import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-artifact-checkin-local',
  templateUrl: './artifact-checkin-local.component.html',
  styleUrls: ['./artifact-checkin-local.component.css']
})
export class ArtifactCheckinLocalComponent {
  @Input() artifact: any; // Bu input'un tanımlandığından emin olun
  // veya daha spesifik bir tip kullanın:
  // @Input() artifact: Artifact;
}