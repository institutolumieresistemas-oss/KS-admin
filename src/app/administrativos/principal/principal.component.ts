import { Component } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { EventosService } from '../../servicios/eventos.service';
import Pusher from 'pusher-js';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {
  eventos: any;
  cargos: any;
  abonos: any;
  gastos: any;
  total = '0';
  notificacion = '';
  constructor(private generales: GeneralesService, private servicio: EventosService){}

  ngOnInit(){
    const pusher = new Pusher('25ad0ac15285cf172667', {
      cluster: 'us2'
    });

    const canal = pusher.subscribe('notificaciones');

    canal.bind('nuevo-mensaje', (data: any) => {
      console.log('Mensaje recibido:', data.mensaje);
      this.notificacion = data.mensaje
    });
    this.mostrar();
  }

  mostrar(){
    this.servicio.mostrar().subscribe((respuesta: any) => {
      this.eventos = respuesta.datos;
    },
    error => {
      this.generales.interpretarError(error);
    });
  }
}
