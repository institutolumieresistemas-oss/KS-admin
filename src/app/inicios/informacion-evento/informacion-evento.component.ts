import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { EventosService } from '../../servicios/eventos.service';
import { GeneralesService } from '../../servicios/generales.service';
import { UiSearchModule } from '../../ui-search/ui-search.module';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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

@Component({
  selector: 'app-informacion-evento',
  standalone: true,
  imports: [CommonModule, UiSearchModule],
  templateUrl: './informacion-evento.component.html',
  styleUrl: './informacion-evento.component.css'
})
export class InformacionEventoComponent {
  private route = inject(ActivatedRoute);
  private eventosService = inject(EventosService);
  private generales = inject(GeneralesService);

  evento = signal<any>(null);
  paquetes = signal<any[]>([]);
  personajes = signal<any[]>([]);
  talleres = signal<any[]>([]);
  cargando = signal<boolean>(true);

  constructor() {
    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe(params => {
      const id = params.get('evento');
      if (id) {
        this.cargarDatos(id);
      }
    });
  }

  cargarDatos(id: string): void {
    this.cargando.set(true);
    this.eventosService.mostrar().subscribe({
      next: (res: any) => {
        this.paquetes.set(res.listas?.paquetes || []);
        this.personajes.set(res.listas?.personajes || []);
        this.talleres.set(res.listas?.talleres || []);

        const encontrado = res.datos?.find((e: any) => e.id.toString() === id.toString() || e.folio.toString() === id.toString());
        if (encontrado) {
          this.evento.set(encontrado);
          this.cargando.set(false);
        } else {
          this.eventosService.buscarCodigo({ folio: id }).subscribe({
            next: (buscaRes: any) => {
              let ev = null;
              if (buscaRes) {
                if (buscaRes.datos) {
                  ev = Array.isArray(buscaRes.datos) ? buscaRes.datos[0] : buscaRes.datos;
                } else if (buscaRes.evento) {
                  ev = buscaRes.evento;
                } else if (buscaRes.id) {
                  ev = buscaRes;
                }
              }
              if (ev) {
                this.evento.set(ev);
              } else {
                this.generales.mensajeError('No se encontró la información del evento.');
              }
              this.cargando.set(false);
            },
            error: (err: unknown) => {
              this.generales.interpretarError(err);
              this.cargando.set(false);
            }
          });
        }
      },
      error: (err: unknown) => {
        this.generales.interpretarError(err);
        this.cargando.set(false);
      }
    });
  }
}
