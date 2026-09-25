import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { GeneralesService } from './generales.service';

@Injectable({
  providedIn: 'root'
})
export class IngresosService {
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'bearer' + localStorage.getItem('token')
  });
  uri = environment.url+'ingresos/';
  constructor(private http: HttpClient, private generales: GeneralesService) {
  }

  nuevo(usuario: any) {
    const url = this.uri + 'nuevo';
    return this.http.post(url, usuario, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  mostrar() {
    const url = this.uri + 'mostrar';
    return this.http.post(url, {}, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  administrativos() {
    const url = this.uri + 'administrativos';
    return this.http.post(url, {}, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  modificar(body: any) {
    const url = this.uri + 'modificar';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  auditar(body: any) {
    const url = this.uri + 'auditar';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  voucher(id: any) {
    const url = this.uri + 'voucher';
    return this.http.post(url, { id }, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  validar(dato: any){
    if(this.generales.validarString(dato.monto)){
      this.generales.mensajeError('No se ha ingresado el monto');
        return false;
    }
    if(this.generales.validarString(dato.concepto)){
      this.generales.mensajeError('No se ha ingresado el concepto');
        return false;
    }
    if(this.generales.validarEntero(dato.idRubro)){
      this.generales.mensajeError('No se ha seleccionado el rubro');
        return false;
    }
    if(this.generales.validarEntero(dato.idTipo)){
      this.generales.mensajeError('No se ha seleccionado el tipo');
        return false;
    }
    if(this.generales.validarEntero(dato.idCalendario)){
      this.generales.mensajeError('No se ha seleccionado el calendario');
        return false;
    }
    if(this.generales.validarEntero(dato.idFormaPago)){
      this.generales.mensajeError('No se ha seleccionado la forma de pago');
        return false;
    }
    if(this.generales.validarEntero(dato.idCuenta)){
      this.generales.mensajeError('No se ha seleccionado la cuenta');
        return false;
    }
    return true;
  }
}
