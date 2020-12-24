import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SharedService } from '../../services/shared.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private sharedService: SharedService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

    if(this.sharedService.isLoggedIn()){
        return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

}
