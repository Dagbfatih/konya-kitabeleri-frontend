import { OrderByPipe } from './../../pipes/order-by.pipe';
import { ArtifactFilterPipe } from './../../pipes/artifact-filter.pipe';
import { ArtifactUpdateService } from './../../services/artifact-update.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [ArtifactUpdateService, ArtifactFilterPipe, OrderByPipe],
})
export class IOCModule {}
