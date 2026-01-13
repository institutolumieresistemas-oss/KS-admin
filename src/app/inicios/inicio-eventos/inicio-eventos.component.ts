import { Component } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { EventosService } from '../../servicios/eventos.service';
import Pusher from 'pusher-js';

@Component({
  selector: 'app-inicio-eventos',
  standalone: false,
  templateUrl: './inicio-eventos.component.html',
  styleUrl: './inicio-eventos.component.css'
})
export class InicioEventosComponent {
  eventos: any;
  semanas: any;
  constructor(private generales: GeneralesService, private servicio: EventosService){}

  ngOnInit(){
    this.mostrar();
  }

  mostrar(){
    this.servicio.mostrar().subscribe((respuesta: any) => {
      this.eventos = respuesta.datos;
      this.semanas = respuesta.listas.semanas;
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  buscar(dato: any){
    this.servicio.buscar({semana: dato}).subscribe((respuesta: any) => {
      this.eventos = respuesta;
    },
    error => {
      this.generales.interpretarError(error);
    });
  }
}
