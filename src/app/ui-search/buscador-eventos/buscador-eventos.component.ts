import { Component, inject, signal, HostListener, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EventosService } from '../../servicios/eventos.service';
import { GeneralesService } from '../../servicios/generales.service';
import { Subscription } from 'rxjs';

interface Evento {
  id: number;
  folio: string;
  festejado: string;
  nombre?: string;
  celular?: string;
  fecha: string;
  estadoActual?: string;
  estado_actual?: string;
}

interface BusquedaRespuesta {
  datos?: Evento | Evento[];
  evento?: Evento;
  id?: number;
  folio?: string;
  festejado?: string;
  nombre?: string;
  celular?: string;
  fecha?: string;
}

@Component({
  selector: 'app-buscador-eventos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './buscador-eventos.component.html',
  styleUrl: './buscador-eventos.component.css'
})
export class BuscadorEventosComponent implements OnDestroy {
  private eventosService = inject(EventosService);
  private generales = inject(GeneralesService);
  private router = inject(Router);
  private elementRef = inject(ElementRef);

  query = signal<string>('');
  resultados = signal<Evento[]>([]);
  cargando = signal<boolean>(false);
  mostrarResultados = signal<boolean>(false);

  private searchSubscription: Subscription | null = null;

  onSearch(): void {
    const value = this.query().trim();
    this.mostrarResultados.set(true);

    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }

    if (!value) {
      this.resultados.set([]);
      this.cargando.set(false);
      return;
    }

    this.cargando.set(true);

    this.searchSubscription = this.eventosService.buscarCodigo({ folio: value }).subscribe({
      next: (respuesta: BusquedaRespuesta) => {
        console.log('Respuesta buscarCodigo:', respuesta);
        let datos: Evento[] = [];
        
        if (respuesta) {
          if (respuesta.datos && Array.isArray(respuesta.datos)) {
            datos = respuesta.datos;
          } else if (respuesta.datos && typeof respuesta.datos === 'object' && 'id' in respuesta.datos) {
            datos = [respuesta.datos as Evento];
          } else if (respuesta.evento && typeof respuesta.evento === 'object' && 'id' in respuesta.evento) {
            datos = [respuesta.evento as Evento];
          } else if (Array.isArray(respuesta)) {
            datos = respuesta as Evento[];
          } else if (typeof respuesta === 'object' && 'id' in respuesta) {
            datos = [respuesta as Evento];
          }
        }
        
        this.resultados.set(datos);
        this.cargando.set(false);
      },
      error: (error: unknown) => {
        this.generales.interpretarError(error);
        this.cargando.set(false);
      }
    });
  }

  seleccionarEvento(evento: Evento): void {
    this.mostrarResultados.set(false);
    this.query.set('');
    this.resultados.set([]);
    this.router.navigate(['admin/informacionEvento', evento.folio]);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.mostrarResultados.set(false);
    }
  }

  onFocus(): void {
    if (this.query().trim()) {
      this.mostrarResultados.set(true);
    }
  }

  getEstadoActual(evento: Evento): string {
    return evento.estadoActual || evento.estado_actual || '';
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }
}
