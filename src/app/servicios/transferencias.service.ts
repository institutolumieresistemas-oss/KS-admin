import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { GeneralesService } from './generales.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransferenciasService {
constructor(private http: HttpClient, private generales: GeneralesService) { }
headers: HttpHeaders = new HttpHeaders({
  'Content-Type' : 'application/json',
  Authorization : 'bearer ' + localStorage.getItem('token')
});
uri = environment.url+'transferencias/';

mostrar() {
  const url = this.uri + 'mostrar';
  return this.http.post(url, {}, {headers: this.headers}).pipe( map(respuesta => respuesta) );
}

traer() {
  const url = this.uri + 'traer';
  return this.http.post(url, {}, {headers: this.headers}).pipe( map(respuesta => respuesta) );
}

nuevo(body: any) {
  const url = this.uri + 'nuevo';
  return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
}

aceptar(body: any) {
  const url = this.uri + 'aceptar';
  return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
}

rechazar(body: any) {
  const url = this.uri + 'rechazar';
  return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
}

eliminar(body: any){
  const url = this.uri + 'eliminar';
  return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
}

activar(body: any){
  const url = this.uri + 'activar';
  return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
}

desactivar(body: any){
  const url = this.uri + 'desactivar';
  return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
}

validar(dato: any){
  if(this.generales.validarString(dato.monto)){
    this.generales.mensajeError('No se ha ingresado el monto');
    return false;
  }
  if(this.generales.validarEntero(dato.idSucursalEntrad)){
    this.generales.mensajeError('No se ha ingresado el monto');
    return false;
  }
  return true;
}
}
