import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { GeneralesService } from './generales.service';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SemanasService {
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'bearer' + localStorage.getItem('token')
  });
  uri = environment.url+'semanas/';
  constructor(private http: HttpClient, private generales: GeneralesService) {
  }

  nuevo(body: any) {
    const url = this.uri + 'nuevo';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
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
    return true;
  }
}
