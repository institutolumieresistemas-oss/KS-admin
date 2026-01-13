import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InicioService {
  headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer' + localStorage.getItem('token')
    });
    uri = environment.url+'inicio/';
    constructor(private http: HttpClient) {
    }
  
    metas(body: any) {
      const url = this.uri + 'metas';
      return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
    }
}
