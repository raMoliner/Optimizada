import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DBTaskService } from '../../services/dbtask.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  userName: string = '';
  password: string = '';

  constructor(private dbTaskService: DBTaskService, private router: Router) {}

  async login() {
    const success = await this.dbTaskService.login(this.userName, parseInt(this.password));
    if (success) {
      await this.dbTaskService.setSession({ userName: this.userName });
      this.router.navigate(['/home']);
    } else {
      alert('Login failed');
    }
  }
}