import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatoPDFService {
  token = '';
    headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer' + localStorage.getItem('token')
    });
    uri = environment.url+'pdf/';
    constructor(private http: HttpClient) {
    }
  
    ingreso(usuario: any) {
      const url = this.uri + 'ingreso';
      return this.http.post(url, usuario, {headers: this.headers}).pipe( map(respuesta => respuesta) );
    }
}
