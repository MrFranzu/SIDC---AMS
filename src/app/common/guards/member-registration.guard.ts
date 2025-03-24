import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MemberRegistrationGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if ((this.auth.currentUserValue.applicant.tab === null || this.auth.currentUserValue.applicant.tab !== "Completed") && window.location.href.indexOf("registration") === -1) {
      this.auth.redirectMember();
      return false;
    }
    
    return true;
  }
  
}
