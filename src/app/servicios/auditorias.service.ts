import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuditoriasService {
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'bearer' + localStorage.getItem('token')
  });
  uri = environment.url+'auditorias/';
  constructor(private http: HttpClient) {
  }

  ingresos(body: any) {
    const url = this.uri + 'ingresos';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  auditarIngreso(body: any) {
    const url = this.uri + 'auditarIngreso';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  pendienteIngreso(body: any) {
    const url = this.uri + 'pendienteIngreso';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  egresos(body: any) {
    const url = this.uri + 'egresos';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  auditarEgreso(body: any) {
    const url = this.uri + 'auditarEgreso';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  pendienteEgreso(body: any) {
    const url = this.uri + 'pendienteEgreso';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }
}
