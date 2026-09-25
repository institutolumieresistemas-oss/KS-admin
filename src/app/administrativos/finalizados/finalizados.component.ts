import { Component } from '@angular/core';
import { EventosService } from '../../servicios/eventos.service';
import { GeneralesService } from '../../servicios/generales.service';

@Component({
  selector: 'app-finalizados',
  standalone: false,
  templateUrl: './finalizados.component.html',
  styleUrl: './finalizados.component.css'
})
export class FinalizadosComponent {
  eventos: any;
  semanas: any;
  listas = {
    semanas: [],
    paquetes: [],
    talleres: [],
    personajes: []
  }
  datos: any;
  semanaSeleccionada: any = 0;
  constructor(private servicio: EventosService, private generales: GeneralesService){}

  ngOnInit(){
    const semanaGuardada = localStorage.getItem('filtro_semana_finalizados');
    if (semanaGuardada && !this.generales.validarEntero(semanaGuardada)) {
      this.semanaSeleccionada = semanaGuardada.toString();
    }
    this.mostrar();
  }

  mostrar(){
    this.servicio.finalizados().subscribe((respuesta: any) => {
      this.listas = respuesta.listas;
      this.datos = respuesta.datos;
      if (this.semanaSeleccionada && !this.generales.validarEntero(this.semanaSeleccionada)) {
        this.filtrarPorSemana(this.semanaSeleccionada);
      } else {
        this.eventos = respuesta.datos;
      }
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  buscar(semana: any){
    this.semanaSeleccionada = semana;
    if (this.generales.validarEntero(semana) || semana === '0' || semana === 0) {
      localStorage.removeItem('filtro_semana_finalizados');
      this.semanaSeleccionada = 0;
      this.eventos = this.datos;
      return;
    }

    localStorage.setItem('filtro_semana_finalizados', semana.toString());
    this.filtrarPorSemana(semana);
  }

  private filtrarPorSemana(semana: any){
    if (!this.datos) return;
    this.eventos = this.datos.filter((evento: any) =>
      Number(evento.semana) === Number(semana)
    );
  }
}
