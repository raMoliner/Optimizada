import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DBTaskService } from '../../services/dbtask.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  segment: string = 'mis-datos';

  constructor(private dbTaskService: DBTaskService, private router: Router) {}

  segmentChanged(event: any) {
    this.segment = event.detail.value;
  }

  async logout() {
    const session = await this.dbTaskService.getSession();
    if (session) {
      await this.dbTaskService.logout(session.userName);
      await this.dbTaskService.setSession(null);
      this.router.navigate(['/login']);
    }
  }
}