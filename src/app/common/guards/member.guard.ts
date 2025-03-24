import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from '../models/role';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MemberGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const currentUser = this.auth.currentUserValue;

    if (currentUser && this.auth.isAuthenticated) {
      if (currentUser.roles[0] !== Role.Basic) {
        this.router.navigate(['/error/unauthorized']);
        return false;
      }
      
      return true;
    }
   
    this.auth.clearSession();
    this.router.navigate(['/auth/login']);
    return false;
  }
  
}
