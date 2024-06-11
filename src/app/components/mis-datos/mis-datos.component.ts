import { Component, OnInit } from '@angular/core';
import { DBTaskService } from '../../services/dbtask.service';

@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.component.html',
  styleUrls: ['./mis-datos.component.scss'],
})
export class MisDatosComponent implements OnInit {
  user: any = {};

  constructor(private dbTaskService: DBTaskService) {}

  async ngOnInit() {
    this.user = await this.dbTaskService.getSession();
  }
}