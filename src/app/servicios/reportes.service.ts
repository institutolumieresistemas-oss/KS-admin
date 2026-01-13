import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'bearer' + localStorage.getItem('token')
  });
  uri = environment.url+'reportes/';
  constructor(private http: HttpClient) {
  }

  caja() {
    const url = this.uri + 'caja';
    return this.http.post(url, {}, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  eventos(body: any) {
    const url = this.uri + 'eventos';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  ingresos(body: any) {
    const url = this.uri + 'ingresos';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  egresos(body: any) {
    const url = this.uri + 'egresos';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }
}
