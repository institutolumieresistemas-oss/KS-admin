import { Component, Input } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { EventosService } from '../../servicios/eventos.service';

@Component({
  selector: 'app-evento-grafico',
  templateUrl: './evento-grafico.component.html',
  styleUrl: './evento-grafico.component.css'
})
export class EventoGraficoComponent {
  @Input() evento: any;
  @Input() numero = 0;
  vista = '';

  constructor(public generales: GeneralesService, private servicio: EventosService){}

  modal(vista: any){
    this.vista = '';
    this.generales.delay(500).then(fun => {
      this.vista = vista;
      this.generales.abrirModal();
    });
  }
  
  programarSalida(datos: any){
    let body = {
      id: this.evento.id,
      salida: datos.salida
    }
    this.servicio.programarSalida(body).subscribe((respuesta: any) => {
      this.generales.mensajeCorrecto('Hora de salida actualizada correctamente');
      this.evento.salida = respuesta.salida;
    },
    error => {
      this.generales.interpretarError(error);
    });
  }
}
