import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { GeneralesService } from './generales.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioSucursalesService {
  constructor(private http: HttpClient, private generales: GeneralesService) { }
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json',
    Authorization : 'bearer ' + localStorage.getItem('token')
  });
  uri = environment.url+'usuariosucursales/';
  
  
  asignar(body: any) {
    const url = this.uri + 'asignar';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }
  
  retirar(body: any) {
    const url = this.uri + 'retirar';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  validar(dato: any){
    if(this.generales.validarEntero(dato.idSucursal)){
      this.generales.mensajeError('No se ha seleccionado una sucursal');
      return false;
    }
    if(this.generales.validarEntero(dato.idUsuario)){
      this.generales.mensajeError('No se ha seleccionado un usuario');
      return false;
    }
    return true;
  }
}
