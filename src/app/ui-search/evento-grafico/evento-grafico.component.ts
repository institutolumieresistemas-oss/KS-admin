import { Component, Input, SimpleChanges } from '@angular/core';
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
  @Input() paquetes: any;
  @Input() personajes: any;
  @Input() talleres: any;
  personajeSeleccionado: any = null;

  vista = '';
  ver = 0;
  modificarLider = false;
  modificarSalida = false;
  modificarPaquete = false;
  modificarFecha = false;
  modificarHora = false;
  modificarPrecio = false;
  modificarEquipo = false;
  modificarTalleres = false;
  constructor(public generales: GeneralesService, private servicio: EventosService, private router: Router){}

  modal(vista: any){
    this.vista = '';
    this.generales.delay(1000).then(fun => {
      this.vista = vista;
      this.generales.abrirModal();
    });
  }

  ngOnChanges(changes: SimpleChanges){}
  
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

  paquete(){
    this.servicio.paquete(this.evento).subscribe((respuesta: any) => {
      this.generales.cerrarModal();
      this.generales.mensajeCorrecto('Paquete actualizado correctamente');
      this.modificarPaquete = false;
      this.evento = respuesta;
    },
    error => {
      this.modificarPaquete = false;
      this.generales.interpretarError(error);
    });
  }

  fecha(){
    this.servicio.fecha(this.evento).subscribe((respuesta: any) => {
      this.generales.cerrarModal();
      this.generales.mensajeCorrecto('Fecha actualizada correctamente');
      this.modificarFecha = false;
      this.evento = respuesta;
    },
    error => {
      this.modificarFecha = false;
      this.generales.interpretarError(error);
    });
  }

  hora(){
    this.servicio.hora(this.evento).subscribe((respuesta: any) => {
      this.generales.cerrarModal();
      this.generales.mensajeCorrecto('Hora actualizada correctamente');
      this.modificarHora = false;
      this.evento = respuesta;
    },
    error => {
      this.modificarHora = false;
      this.generales.interpretarError(error);
    });
  }

  precio(){
    this.servicio.precio(this.evento).subscribe((respuesta: any) => {
      this.generales.cerrarModal();
      this.generales.mensajeCorrecto('Precio actualizado correctamente');
      this.modificarPrecio = false;
      this.evento = respuesta;
    },
    error => {
      this.modificarPrecio = false;
      this.generales.interpretarError(error);
    });
  }

  agregarPersonaje(personaje: any){
    const body = {
      idPersonaje: personaje,
      idEvento: this.evento.id 
    }
    this.servicio.agregarPersonaje(body).subscribe((respuesta: any) => {
      this.generales.cerrarModal();
      this.generales.mensajeCorrecto('Personaje agregado correctamente');
      this.modificarEquipo = false;
      this.evento = respuesta;
    },
    error => {
      this.modificarEquipo = false;
      this.generales.interpretarError(error);
    });
  }

  eliminarPersonaje(personaje: any){
    this.servicio.eliminarPersonaje(personaje).subscribe((respuesta: any) => {
      this.generales.cerrarModal();
      this.generales.mensajeCorrecto('Personaje eliminado correctamente');
      this.modificarEquipo = false;
      this.evento = respuesta;
    },
    error => {
      this.modificarEquipo = false;
      this.generales.interpretarError(error);
    });
  }

  actulaizarTalleres(){
    this.servicio.talleres(this.evento).subscribe((respuesta: any) => {
      this.generales.cerrarModal();
      this.generales.mensajeCorrecto('Talleres actualizados correctamente');
      this.modificarTalleres = false;
      this.evento = respuesta;
    },
    error => {
      this.modificarTalleres = false;
      this.generales.interpretarError(error);
    });
  }

  toJson(conversion: any) {
    return JSON.stringify(conversion.map((e: any) => ({ id: e.id })));
  }

  getTextColor(bgColor: string): string {
    if (!bgColor) return '#000';
  
    const rgb = this.extractRGB(bgColor);
    if (!rgb) return '#000';
  
    const [r, g, b] = rgb;
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b);
  
    return luminance > 150 ? '#000' : '#fff';
  }
  
  private extractRGB(color: string): number[] | null {
    if (color.startsWith('rgb')) {
      return color.match(/\d+/g)?.map(Number) ?? null;
    }
  
    if (color.startsWith('#')) {
      const hex = color.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return [r, g, b];
    }
  
    return null;
  }

}
