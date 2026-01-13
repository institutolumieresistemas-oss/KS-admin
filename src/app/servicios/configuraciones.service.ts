import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { GeneralesService } from './generales.service';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionesService {
  headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer' + localStorage.getItem('token')
    });
    uri = environment.url+'configuraciones/';
    constructor(private http: HttpClient, private generales: GeneralesService) {
    }
  
    notificaciones() {
      const url = this.uri + 'notificaciones';
      return this.http.get(url, {headers: this.headers}).pipe( map(respuesta => respuesta) );
    }

    agregar(body: any) {
      const url = this.uri + 'agregar';
      return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
    }

    quitar(body: any) {
      const url = this.uri + 'quitar';
      return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
    }

    usuariosNotificaciones(body: any) {
      const url = this.uri + 'usuariosNotificaciones';
      return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
    }

    inicio() {
      const url = this.uri + 'inicio';
      return this.http.get(url, {headers: this.headers}).pipe( map(respuesta => respuesta) );
    }

    guardar(body: any) {
      const url = this.uri + 'guardar';
      return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
    }

    eliminar(body: any) {
      const url = this.uri + 'eliminar';
      return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
    }
}
