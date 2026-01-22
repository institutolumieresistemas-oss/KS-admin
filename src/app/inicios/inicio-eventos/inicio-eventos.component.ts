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
  listado: any;
  eventos: any;
  semanas: any;
  paquetes: any;
  personajes: any;
  talleres: any;
  constructor(private generales: GeneralesService, private servicio: EventosService){}

  ngOnInit(){
    this.mostrar();
  }

  mostrar(){
    this.servicio.mostrar().subscribe((respuesta: any) => {
      this.listado = respuesta.datos;
      this.eventos = respuesta.datos;
      this.semanas = respuesta.listas.semanas;
      this.paquetes = respuesta.listas.paquetes;
      this.personajes = respuesta.listas.personajes;
      this.talleres = respuesta.listas.talleres;
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  buscar(semana: any) {

    if (this.generales.validarEntero(semana)) {
      // Si no hay semana, mostrar todo
      this.eventos = this.listado;
      return;
    }

    this.eventos = this.listado.filter((evento: any) =>
      Number(evento.semana) === Number(semana)
    );
  }
}
