import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DBTaskService {
  private storageInstance: Storage | null = null;
  private dbInstance: SQLiteObject | null = null;

  constructor(private storage: Storage, private sqlite: SQLite) {
    this.init();
  }

  async init() {
    this.storageInstance = await this.storage.create();
    this.dbInstance = await this.sqlite.create({
      name: 'data.db',
      location: 'default'
    });

    await this.createTables();
  }

  async createTables() {
    const query = `
      CREATE TABLE IF NOT EXISTS sesion_data (
        user_name TEXT PRIMARY KEY,
        password INTEGER NOT NULL,
        active INTEGER NOT NULL
      );
    `;
    try {
      await this.dbInstance?.executeSql(query, []);
      console.log('Tabla creada exitosamente');
    } catch (e) {
      console.error('Error creando tabla', e);
    }
  }

  async registerSession(userName: string, password: number) {
    const query = `
      INSERT INTO sesion_data (user_name, password, active)
      VALUES (?, ?, 1);
    `;
    try {
      await this.dbInstance?.executeSql(query, [userName, password]);
      console.log('Sesión registrada exitosamente');
    } catch (e) {
      console.error('Error registrando sesión', e);
    }
  }

  async login(userName: string, password: number) {
    const query = `
      SELECT * FROM sesion_data
      WHERE user_name = ? AND password = ? AND active = 1;
    `;
    try {
      const res = await this.dbInstance?.executeSql(query, [userName, password]);
      return res?.rows.length > 0;
    } catch (e) {
      console.error('Error logging in', e);
      return false;
    }
  }

  async logout(userName: string) {
    const query = `
      UPDATE sesion_data
      SET active = 0
      WHERE user_name = ?;
    `;
    try {
      await this.dbInstance?.executeSql(query, [userName]);
      console.log('Sesión cerrada con éxito');
    } catch (e) {
      console.error('Error al salir de la sesión', e);
    }
  }

  async getSession() {
    const session = await this.storageInstance?.get('session');
    console.log('Sesión Actual: ', session);
    return session;
  }

  async setSession(session: any) {
    await this.storageInstance?.set('session', session);
    console.log('Sesión Set:', session);
  }
}
