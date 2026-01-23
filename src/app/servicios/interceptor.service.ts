import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from './loadin.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(private loading: LoadingService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    this.loading.show();

    let clonedReq = req;

    // =========================
    // Agregar headers siempre
    // =========================
    clonedReq = req.clone({
      setHeaders: {
        'X-Usuario': localStorage.getItem('usuario') || '',
        'X-UsuarioID': localStorage.getItem('identificador') || '',
        'X-SucursalID': localStorage.getItem('sucursal') || '',
        'X-CalendarioID': localStorage.getItem('calendario') || '',
        'X-SemanaID': localStorage.getItem('semana') || ''
      }
    });

    // =========================
    // Mantener tu lógica POST
    // =========================
    if (req.method === 'POST' && req.body) {
      const newBody = {
        ...req.body,
        log: localStorage.getItem('usuario'),
        usuarioID: localStorage.getItem('identificador'),
        sucursalID: localStorage.getItem('sucursal'),
        calendarioID: localStorage.getItem('calendario'),
        semanaID: localStorage.getItem('semana')
      };

      clonedReq = clonedReq.clone({ body: newBody });
    }

    return next.handle(clonedReq).pipe(
      finalize(() => {
        this.loading.hide();
      })
    );
  }
}
