import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const currentUser = this.auth.currentUserValue;

    if (currentUser && this.auth.isAuthenticated) {
      // if (route.data.roles && route.data.roles.indexOf(currentUser.roles[0]) === -1) {
      //   this.router.navigate(['/pages/miscellaneous/not-authorized']);
      //   return false;
      // }

      return true;
    }
   
    this.auth.clearSession();
    this.router.navigate(['/auth/login']);
    return false;
  }
  
}
