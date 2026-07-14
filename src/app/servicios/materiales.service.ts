import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaterialesService {
  token = '';
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'bearer' + localStorage.getItem('token')
  });
  uri = environment.url + 'materiales/';

  constructor(private http: HttpClient) {}

  nuevo(datos: any) {
    const url = this.uri + 'nuevo';
    return this.http.post(url, datos, { headers: this.headers }).pipe(map(respuesta => respuesta));
  }

  mostrar() {
    const url = this.uri + 'mostrar';
    return this.http.get(url, { headers: this.headers }).pipe(map(respuesta => respuesta));
  }
}
