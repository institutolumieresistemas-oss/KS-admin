import { Component } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import Pusher from 'pusher-js';
import { ConfiguracionesService } from '../../servicios/configuraciones.service';
import { EgresosService } from '../../servicios/egresos.service';

@Component({
  selector: 'app-notificacion-egresos-red',
  templateUrl: './notificacion-egresos-red.component.html',
  styleUrl: './notificacion-egresos-red.component.css'
})
export class NotificacionEgresosRedComponent {
  notificacion = {
      mensaje: '',
      titulo: '',
      botones: false,
      id: 0
    }
    hay = false;
    constructor(private generales: GeneralesService, private servicio: ConfiguracionesService, private egresos: EgresosService){}
    ngOnInit(){
      this.mostrar();
    }
  
    mostrar(){
      this.servicio.usuariosNotificaciones({tipo: 2}).subscribe((respuesta: any) => {
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
      console.log('Conectado a egresos');
      const pusher = new Pusher('25ad0ac15285cf172667', {
        cluster: 'us2'
      });
  
      const canal = pusher.subscribe('egresos');
  
      canal.bind('datos', (data: any) => {
        this.notificacion = data.datos;
        this.notificacion.botones = true;
        this.hay = true;
      });
    }
  
    resolver(){
      this.egresos.aceptar(this.notificacion).subscribe((respuesta: any) => {
        this.generales.mensajeCorrecto('Egreso modificado correctamente');
        this.hay = false;
      },
      error => {
        this.generales.interpretarError(error);
      });
    }
  
    rechazar(){
      this.egresos.rechazar(this.notificacion).subscribe((respuesta: any) => {
        this.generales.mensajeCorrecto('Notificacion rechazada correctamente');
        this.hay = false;
      },
      error => {
        this.generales.interpretarError(error);
      });
    }
}
