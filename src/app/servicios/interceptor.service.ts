import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralesService } from './generales.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor(private generales: GeneralesService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const method = req.method;
    const url = req.url;
    const body = req.body;
    const headers = req.headers;
    if(method.toString() === 'POST'){
      body.log = localStorage.getItem('usuario');
      body.usuarioID = localStorage.getItem('identificador');
      body.sucursalID = localStorage.getItem('sucursal');
      body.calendarioID = localStorage.getItem('calendario');
    }
    req = req.clone({method, url, body, headers});
    return next.handle(req);
  }
}
