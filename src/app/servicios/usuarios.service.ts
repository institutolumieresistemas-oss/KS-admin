import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { GeneralesService } from './generales.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  token = '';
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'bearer' + localStorage.getItem('token')
  });
  uri = environment.url+'usuarios/';
  constructor(private http: HttpClient, private generales: GeneralesService) {
  }

  nuevo(usuario: any) {
    const url = this.uri + 'nuevo';
    return this.http.post(url, usuario, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  informacion(usuario: string | null) {
    const url = this.uri + 'informacion';
    return this.http.post(url, {usuario}, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  mostrar() {
    const url = this.uri + 'mostrar';
    return this.http.get(url, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  validar(dato: any){
    if(this.generales.validarString(dato.usuario)){
      this.generales.mensajeError('No se ha ingresado el nombre');
      return false;
    }
    if(this.generales.validarString(dato.password)){
      this.generales.mensajeError('No se ha ingresado la contraseña');
      return false;
    }
    if(this.generales.validarEntero(dato.idTipoUsuario)){
      this.generales.mensajeError('No se ha seleccionado un tipo de usuario');
      return false;
    }
    if(this.generales.validarString(dato.nombre)){
      this.generales.mensajeError('No se ha ingresado el nombre');
      return false;
    }
    if(this.generales.validarString(dato.celular)){
      this.generales.mensajeError('No se ha ingresado el celular');
      return false;
    }
    if(this.generales.validarEntero(dato.idSucursa)){
      this.generales.mensajeError('No se ha seleccionado la sucursal');
      return false;
    }
    return true;
  }
}
