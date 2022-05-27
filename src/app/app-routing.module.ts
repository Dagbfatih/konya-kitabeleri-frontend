import { ContactComponent } from './components/contact/contact.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { VirtualTourComponent } from './components/virtual-tour/virtual-tour.component';
import { KonyaKitabeComponent } from './components/konya-kitabe/konya-kitabe.component';
import { KonyaComponent } from './components/konya/konya.component';
import { SettingsComponent } from './components/settings/settings.component';
import { HistoricalArtifactsComponent } from './components/historical-artifacts/historical-artifacts.component';
import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routerOptions: ExtraOptions = {
  onSameUrlNavigation: 'reload',
  anchorScrolling: 'enabled',
  scrollPositionRestoration: 'enabled',
  useHash: true,
};

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'historical-artifacts',
    component: HistoricalArtifactsComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: 'konya',
    component: KonyaComponent,
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
  },
  {
    path: 'virtual-tours',
    component: VirtualTourComponent,
  },
  {
    path: 'konya-kitabeleri/:period',
    component: KonyaKitabeComponent,
  },
  {
    path: 'konya-kitabeleri/:period/:artifactType/:id',
    component: KonyaKitabeComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
