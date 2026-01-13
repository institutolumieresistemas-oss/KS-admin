import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralesService } from './generales.service';
import { catchError, map, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient, private generales: GeneralesService) { }
  token = '';
  headers: HttpHeaders = new HttpHeaders({
  });
  uri = environment.url+'token';

  getToken(body: any) {
    return this.http.post(this.uri, body, {headers: this.headers}).
    pipe( map(respuesta => respuesta),
    catchError(error => throwError(error)));
  }
}
