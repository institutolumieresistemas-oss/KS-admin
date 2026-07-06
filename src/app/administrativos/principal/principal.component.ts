import { Component, OnChanges } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { EventosService } from '../../servicios/eventos.service';
import Pusher from 'pusher-js';

@Component({
    selector: 'app-principal',
    templateUrl: './principal.component.html',
    styleUrl: './principal.component.css',
    standalone: false
})
export class PrincipalComponent {
  eventos: any;
  notificacion = '';
  inicio: any;
  tipo: any;
  constructor(private generales: GeneralesService, private servicio: EventosService){}

  ngOnInit(){
    this.tipo = localStorage.getItem('permisos');
    /*const pusher = new Pusher('25ad0ac15285cf172667', {
      cluster: 'us2'
    });

    const canal = pusher.subscribe('notificaciones');

    canal.bind('nuevo-mensaje', (data: any) => {
      console.log('Mensaje recibido:', data.mensaje);
      this.notificacion = data.mensaje
    });*/

    this.generales.delay(2000).then(fun => {
      this.inicio = localStorage.getItem('inicio')?.toString();
    });
  }

  ngOnChanges(changes: OnChanges){
    console.log(changes);
  }
}
