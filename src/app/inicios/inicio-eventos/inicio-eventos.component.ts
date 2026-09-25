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
  eventos = new Array();
  semanas: any;
  paquetes: any;
  personajes: any;
  talleres: any;
  total = 0;
  semanaSeleccionada: any = 0;
  constructor(private generales: GeneralesService, private servicio: EventosService){}

  ngOnInit(){
    const semanaGuardada = localStorage.getItem('filtro_semana_inicio_eventos');
    if (semanaGuardada && !this.generales.validarEntero(semanaGuardada)) {
      this.semanaSeleccionada = semanaGuardada.toString();
    }
    this.mostrar();
  }

  mostrar(){
    this.servicio.mostrar().subscribe((respuesta: any) => {
      this.listado = respuesta.datos;
      this.semanas = respuesta.listas.semanas;
      this.paquetes = respuesta.listas.paquetes;
      this.personajes = respuesta.listas.personajes;
      this.talleres = respuesta.listas.talleres;

      if (this.semanaSeleccionada && !this.generales.validarEntero(this.semanaSeleccionada)) {
        this.filtrarPorSemana(this.semanaSeleccionada);
      } else {
        this.eventos = respuesta.datos;
        this.total = this.eventos ? this.eventos.length : 0;
      }
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  buscar(semana: any) {
    this.semanaSeleccionada = semana;
    if (this.generales.validarEntero(semana) || semana === '0' || semana === 0) {
      localStorage.removeItem('filtro_semana_inicio_eventos');
      this.semanaSeleccionada = 0;
      this.eventos = this.listado;
      this.total = this.eventos ? this.eventos.length : 0;
      return;
    }

    localStorage.setItem('filtro_semana_inicio_eventos', semana.toString());
    this.filtrarPorSemana(semana);
  }

  private filtrarPorSemana(semana: any) {
    if (!this.listado) return;
    this.eventos = this.listado.filter((evento: any) =>
      Number(evento.semana) === Number(semana)
    );
    this.total = this.eventos.length;
  }
}
