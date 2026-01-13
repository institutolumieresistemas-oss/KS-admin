import { Component } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import Pusher from 'pusher-js';
import { ConfiguracionesService } from '../../servicios/configuraciones.service';
import { IngresosService } from '../../servicios/ingresos.service';

@Component({
    selector: 'app-notificacion-ingresos-red',
    templateUrl: './notificacion-ingresos-red.component.html',
    styleUrl: './notificacion-ingresos-red.component.css',
    standalone: false
})
export class NotificacionIngresosRedComponent {
  notificacion = {
    mensaje: '',
    titulo: '',
    botones: false,
    id: 0
  }
  hay = false;
  constructor(private generales: GeneralesService, private servicio: ConfiguracionesService, private ingresos: IngresosService){}
  ngOnInit(){
    this.mostrar();
  }

  mostrar(){
    this.servicio.usuariosNotificaciones({tipo: 1}).subscribe((respuesta: any) => {
      respuesta.forEach((usuario: any) => {
        if(localStorage.getItem('identificador')?.toString() === usuario.idUsuario.toString()){
          this.conectar();
        }
      });
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  conectar(){
    const pusher = new Pusher('25ad0ac15285cf172667', {
      cluster: 'us2'
    });

    const canal = pusher.subscribe('ingresos');

    canal.bind('datos', (data: any) => {
      this.notificacion = data.datos;
      this.notificacion.botones = true;
      this.hay = true;
    });
  }

  resolver(){
    this.ingresos.aceptar(this.notificacion).subscribe((respuesta: any) => {
      this.generales.mensajeCorrecto('Ingreso modificado correctamente');
      this.hay = false;
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  rechazar(){
    this.ingresos.rechazar(this.notificacion).subscribe((respuesta: any) => {
      this.generales.mensajeCorrecto('Notificacion rechazada correctamente');
      this.hay = false;
    },
    error => {
      this.generales.interpretarError(error);
    });
  }
}
