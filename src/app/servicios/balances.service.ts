import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BalancesService {
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'bearer' + localStorage.getItem('token')
  });
  uri = environment.url+'balances/';
  constructor(private http: HttpClient) {
  }

  general() {
    const url = this.uri + 'general';
    return this.http.get(url, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  caja() {
    const url = this.uri + 'caja';
    return this.http.post(url, {}, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }
}
