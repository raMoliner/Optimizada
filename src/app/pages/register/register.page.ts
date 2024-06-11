import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DBTaskService } from '../../services/dbtask.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  userName: string = '';
  password: string = '';

  constructor(private dbTaskService: DBTaskService, private router: Router) {}

  async register() {
    await this.dbTaskService.registerSession(this.userName, parseInt(this.password));
    await this.dbTaskService.setSession({ userName: this.userName });
    this.router.navigate(['/home']);
  }
}