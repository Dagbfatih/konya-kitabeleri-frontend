import { SourceComponent } from './components/source/source.component';
import { EpitaphImageAddComponent } from './components/epitaph-image-add/epitaph-image-add.component';
import { LocationAddComponent } from './components/location-add/location-add.component';
import { ArtifactImageUpdateComponent } from './components/artifact-image-update/artifact-image-update.component';
import { ArtifactPreviewComponent } from './components/artifact-preview/artifact-preview.component';
import { ArtifactAddConfirmationComponent } from './components/artifact-add-confirmation/artifact-add-confirmation.component';
import { ArtifactImageAddComponent } from './components/artifact-image-add/artifact-image-add.component';
import { ArtifactAddComponent } from './components/artifact-add/artifact-add.component';
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
import { ArtifactUpdateComponent } from './components/artifact-update/artifact-update.component';

export const routerOptions: ExtraOptions = {
  onSameUrlNavigation: 'reload',
  anchorScrolling: 'enabled',
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
    path: 'konya',
    component: KonyaComponent,
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
    path: 'about-us',
    component: AboutUsComponent,
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
    path: 'kitabeler',
    component: KitabeComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard, LoginGuard],
  },
  {
    path: 'admin/:currentPage',
    component: AdminComponent,
    canActivate: [AdminGuard, LoginGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'source',
    component: SourceComponent,
  },
  {
    path: 'admin/artifact/add',
    component: ArtifactAddComponent,
    canActivate: [AdminGuard, LoginGuard],
  },
  {
    path: 'admin/artifact/preview/:id',
    component: ArtifactPreviewComponent,
    canActivate: [AdminGuard, LoginGuard],
  },
  {
    path: 'admin/artifact/upload-images',
    component: ArtifactImageUpdateComponent,
    canActivate: [AdminGuard, LoginGuard],
  },
  {
    path: 'admin/artifact/update',
    component: ArtifactUpdateComponent,
    canActivate: [AdminGuard, LoginGuard],
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
