import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { GeneralesService } from './generales.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer' + localStorage.getItem('token')
    });
    uri = environment.url+'notificaciones/';
    constructor(private http: HttpClient) {
    }
  
    resolver(body: any) {
      const url = this.uri + 'resolver';
      return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
    }
}
