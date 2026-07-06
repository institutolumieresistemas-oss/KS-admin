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
  constructor(private servicio: EventosService, private generales: GeneralesService){}

  ngOnInit(){
    this.mostrar();
  }

  mostrar(){
    this.servicio.finalizados().subscribe((respuesta: any) => {
      this.listas = respuesta.listas;
      this.datos = respuesta.datos;
      this.eventos = respuesta.datos;
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  buscar(semana: any){
    if (this.generales.validarEntero(semana)) {
      // Si no hay semana, mostrar todo
      this.eventos = this.datos;
      return;
    }

    this.eventos = this.datos.filter((evento: any) =>
      Number(evento.semana) === Number(semana)
    );
  }
}
