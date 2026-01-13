import { Component, Input } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { EventosService } from '../../servicios/eventos.service';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';


@Component({
    selector: 'app-evento-grafico',
    templateUrl: './evento-grafico.component.html',
    styleUrl: './evento-grafico.component.css',
    standalone: false
})
export class EventoGraficoComponent {
  @Input() evento: any;
  @Input() bg = 0;
  personajeSeleccionado: any = null;

  vista = '';
  ver = 0;
  modificarLider = false;
  modificarSalida = false;
  constructor(public generales: GeneralesService, private servicio: EventosService, private router: Router){}

  modal(vista: any){
    this.vista = '';
    this.generales.delay(1000).then(fun => {
      this.vista = vista;
      this.generales.abrirModal();
    });
  }
  
  programarSalida(){
    this.servicio.programarSalida(this.evento).subscribe((respuesta: any) => {
      this.generales.mensajeCorrecto('Hora de salida actualizada correctamente');
      this.evento.salida = respuesta.salida;
      this.modificarSalida = false;
    },
    error => {
      this.modificarSalida = false;
      this.generales.interpretarError(error);
    });
  }

  actualizarLider(){
    this.servicio.actualizarLider(this.evento).subscribe((respuesta: any) => {
      this.generales.cerrarModal();
      this.generales.mensajeCorrecto('Lider actualizado correctamente');
      this.modificarLider = false;
    },
    error => {
      this.modificarLider = false;
      this.generales.interpretarError(error);
    });
  }

  estado(){
    this.router.navigate(['admin/estadocuenta', this.evento.id]);
  }

  togglePopover(item: any) {
    this.evento.personajes_asignados.forEach((p: any) => {
      if (p !== item) p.popover = false;
    });
  
    item.popover = !item.popover;
  }
  
  asignarActor(item: any, actor: any) {
    item.idActor = actor.id;
    item.loading = true;
    this.servicio.actualizarEquipo(item).subscribe((respuesta: any) => {
      this.generales.mensajeCorrecto('Actor asignado correctamente');
      this.evento.equipo = respuesta;
      this.generales.cerrarModal();
      item.loading = false;
      item.actor = actor;
    },
    error => {
      item.loading = false;
      this.generales.interpretarError(error);
    });
    item.popover = false;
  }

  capturarPantalla() {
    const elemento = document.getElementById('captura-evento-'+this.evento.folio);
  
    if (!elemento) return;
  
    html2canvas(elemento, {
      scale: 2, // mejor calidad
      useCORS: true
    }).then(canvas => {
      const link = document.createElement('a');
      link.download = `evento-${this.evento.folio}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  }
}
