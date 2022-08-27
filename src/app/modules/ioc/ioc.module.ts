import { OrderByPipe } from './../../pipes/order-by.pipe';
import { ArtifactFilterPipe } from './../../pipes/artifact-filter.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [ArtifactFilterPipe, OrderByPipe],
})
export class IOCModule {}
