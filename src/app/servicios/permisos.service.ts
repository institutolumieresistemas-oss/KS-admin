import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { GeneralesService } from './generales.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {
  token = '';
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'bearer' + localStorage.getItem('token')
  });
  uri = environment.url+'permisos/';
  constructor(private http: HttpClient, private generales: GeneralesService) {
  }
  
  mostrar(body: any) {
    const url = this.uri + 'mostrar';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  activarModulo(body: any){
    const url = this.uri + 'guardarModulo';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  desactivarModulo(body: any){
    const url = this.uri + 'eliminarModulo';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  activarOpcion(body: any){
    const url = this.uri + 'guardarOpcion';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  desactivarOpcion(body: any){
    const url = this.uri + 'eliminarOpcion';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }
}
