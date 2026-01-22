import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { GeneralesService } from './generales.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  token = '';
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'bearer' + localStorage.getItem('token')
  });
  uri = environment.url+'eventos/';
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

  buscar(body: any) {
    const url = this.uri + 'buscar';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  actualizarLider(body: any) {
    const url = this.uri + 'actualizarLider';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  actualizarEquipo(body: any) {
    const url = this.uri + 'actualizarEquipo';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  actualizarestatus(body: any) {
    const url = this.uri + 'actualizarEstatus';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  programarSalida(body: any) {
    const url = this.uri + 'programarSalida';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  estadoCuenta(body: any){
    const url = this.uri + 'estadocuenta';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  nuevoAbono(body: any){
    const url = this.uri + 'nuevoabono';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  nuevoGasto(body: any){
    const url = this.uri + 'nuevogasto';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  paquete(body: any){
    const url = this.uri + 'paquete';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  fecha(body: any){
    const url = this.uri + 'fecha';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  hora(body: any){
    const url = this.uri + 'hora';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  precio(body: any){
    const url = this.uri + 'precio';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  agregarPersonaje(body: any){
    const url = this.uri + 'agregarPersonaje';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  eliminarPersonaje(body: any){
    const url = this.uri + 'eliminarPersonaje';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  talleres(body: any){
    const url = this.uri + 'talleres';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  validarCliente(datos: any){
    if(this.generales.validarString(datos.festejado)){
      this.generales.mensajeError('No se ha ingresado el nombre del festejado');
      return false;
    }
    if(this.generales.validarString(datos.edad)){
      this.generales.mensajeError('No se ha ingresado la edad del festejado');
      return false;
    }
    if(this.generales.validarString(datos.cantidad)){
      this.generales.mensajeError('No se ha ingresado la cantidad de niños');
      return false;
    }
    if(this.generales.validarString(datos.nombre)){
      this.generales.mensajeError('No se ha ingresado el nombre del contratante');
      return false;
    }
    if(this.generales.validarString(datos.celular)){
      this.generales.mensajeError('No se ha ingresado el celular');
      return false;
    }
    return true;
  }

  validarEvento(datos: any){
    if(this.generales.validarEntero(datos.idPaquete)){
      this.generales.mensajeError('No se ha seleccionado un paquete');
      return false;
    }
    if(this.generales.validarString(datos.domicilio)){
      this.generales.mensajeError('No se ha ingresado el domicilio del evento');
      return false;
    }
    if(this.generales.validarString(datos.fecha)){
      this.generales.mensajeError('No se ha ingresado la fecha y hora del evento');
      return false;
    }
    if(this.generales.validarString(datos.monto)){
      this.generales.mensajeError('No se ha ingresado el precio');
      return false;
    }
    if(this.generales.validarEntero(datos.idMedio)){
      this.generales.mensajeError('No se ha seleccionado el medio de contacto');
      return false;
    }
    if(this.generales.validarEntero(datos.idMotivo)){
      this.generales.mensajeError('No se ha seleccionado el motivo');
      return false;
    }
    if(this.generales.validarEntero(datos.idCalendario)){
      this.generales.mensajeError('No se ha seleccionado el calendario');
      return false;
    }
    return true;
  }
}
