import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { DBTaskService } from '../services/dbtask.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private dbTaskService: DBTaskService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const session = await this.dbTaskService.getSession();
    if (session) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}