import { AdminGuard } from './guards/admin.guard';
import { AdminComponent } from './components/admin/admin.component';
import { LoginGuard } from './guards/login.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { KitabeComponent } from './components/kitabe/kitabe.component';
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
  {
    path: 'kitabeler-hakkında',
    component: KitabeComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard, LoginGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
