import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { GeneralesService } from './generales.service';

@Injectable({
  providedIn: 'root'
})
export class SucursalesService {
  token = '';
    headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer' + localStorage.getItem('token')
    });
    uri = environment.url+'sucursales/';
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

    validar(dato: any){
      if(this.generales.validarString(dato.nombre)){
        this.generales.mensajeError('No se ha ingresado el nombre');
        return false;
      }
      if(this.generales.validarString(dato.domicilio)){
        this.generales.mensajeError('No se ha ingresado el domicilio');
        return false;
      }
      if(this.generales.validarString(dato.abreviatura)){
        this.generales.mensajeError('No se ha ingresado la abreviatura');
        return false;
      }
      return true;
    }
}
