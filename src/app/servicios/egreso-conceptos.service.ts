import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EgresoConceptosService {
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'bearer' + localStorage.getItem('token')
  });
  uri = environment.url+'egresoconceptos/';
  constructor(private http: HttpClient) {
  }

  nuevo(usuario: any) {
    const url = this.uri + 'nuevo';
    return this.http.post(url, usuario, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  mostrar() {
    const url = this.uri + 'mostrar';
    return this.http.get(url, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }
}
