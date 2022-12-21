import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageGuard implements CanActivate {
  constructor(private transloco: TranslocoService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const lang = next.params.lang;
    this.transloco.setActiveLang('tr');
    return true;
  }
}
