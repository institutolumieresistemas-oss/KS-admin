import { Component } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { InicioService } from '../../servicios/inicio.service';

@Component({
  selector: 'app-inicio-metas',
  standalone: false,
  templateUrl: './inicio-metas.component.html',
  styleUrl: './inicio-metas.component.css'
})
export class InicioMetasComponent {
  paquetes: any;
  personajes: any;
  motivos: any;
  eventosVendidos: any;
  eventosRealizados: any;
  metasEventos = {
    existe: false,
    datos: {
      meta: 0,
      mes: '',
      cantidad: 0
    }
  };
  metasIngresos = {
    existe: false,
    datos: {
      meta: 0,
      mes: '',
      cantidad: 0
    }
  };
  constructor(private generales: GeneralesService, private servicio: InicioService){}

  ngOnInit(){
    this.mostrar();
  }

  mostrar(){
    this.servicio.metas({}).subscribe((respuesta: any) => {
      this.paquetes = respuesta.paquetes;
      this.personajes = respuesta.personajes;
      this.motivos = respuesta.motivos;
      this.eventosVendidos = respuesta.eventosVendidos;
      this.eventosRealizados = respuesta.eventosRealizados;
      this.metasEventos = respuesta.metasEventos;
      this.metasIngresos = respuesta.metasIngresos;
    },
    error => {
      this.generales.interpretarError(error);
    });
  }
}
