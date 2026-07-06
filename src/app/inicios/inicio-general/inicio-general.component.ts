import { Component } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { InicioService } from '../../servicios/inicio.service';
import { Chart } from 'chart.js/auto';


@Component({
  selector: 'app-inicio-general',
  standalone: false,
  templateUrl: './inicio-general.component.html',
  styleUrl: './inicio-general.component.css'
})
export class InicioGeneralComponent {
  ingresos: any;
  egresos: any;
  promedio: any;
  eventos: any = {};
  year: any = {};
  constructor(public generales: GeneralesService, private servicio: InicioService){}

  ngOnInit(){
    this.mostrar();
  }

  mostrar(){
    this.servicio.estadisticas({}).subscribe((respuesta: any) => {
      this.ingresos = respuesta.ingresos;
      this.egresos = respuesta.egresos;
      this.promedio = respuesta.promedio;
      this.eventos = respuesta.eventos;
      this.year = respuesta.year;
      setTimeout(() => {
        this.crearGrafica();
        this.crearGraficaYear();
      }, 100);
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  crearGrafica(){
    new Chart("graficaEventos", {
      type: 'pie',
      data: {
        labels: ['Finalizados', 'Activos'],
        datasets: [{
          data: [
            this.eventos.finalizados || 0,
            this.eventos.activos || 0
          ]
        }]
      }
    });
  }

  crearGraficaYear(){
    new Chart("graficaEventosYear", {
      type: 'pie',
      data: {
        labels: ['Finalizados', 'Activos'],
        datasets: [{
          data: [
            this.year.finalizados || 0,
            this.year.activos || 0
          ]
        }]
      }
    });
  }
}
