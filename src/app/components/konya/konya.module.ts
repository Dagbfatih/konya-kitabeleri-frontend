import { KonyaComponent } from './konya.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [KonyaComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: KonyaComponent }]),
  ],
})
export class KonyaModule {}
