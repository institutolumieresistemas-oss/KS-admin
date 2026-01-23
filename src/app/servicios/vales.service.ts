import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { GeneralesService } from './generales.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValesService {
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'bearer' + localStorage.getItem('token')
  });
  uri = environment.url+'vales/';
  constructor(private http: HttpClient, private generales: GeneralesService) {
  }

  nuevo(usuario: any) {
    const url = this.uri + 'nuevo';
    return this.http.post(url, usuario, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  mostrar() {
    const url = this.uri + 'mostrar';
    return this.http.get(url, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  traer() {
    const url = this.uri + 'traer';
    return this.http.get(url, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  aceptar(body: any) {
    const url = this.uri + 'aceptar';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  rechazar(body: any) {
    const url = this.uri + 'rechazar';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  validar(dato: any){
    if(this.generales.validarString(dato.monto)){
      this.generales.mensajeError('No se ha ingresado el monto');
        return false;
    }
    return true;
  }
}
