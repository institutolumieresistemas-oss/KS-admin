import { Component, OnInit } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { GeneralesService } from '../../servicios/generales.service';
import { EventosService } from '../../servicios/eventos.service';

@Component({
  selector: 'app-programacion-eventos',
  templateUrl: './programacion-eventos.component.html',
  styleUrl: './programacion-eventos.component.css',
  standalone: false
})
export class ProgramacionEventosComponent implements OnInit {
  configuracion: datatableConfig = {
    alias: [
      'Duración',
      'Paquete',
      'Taller',
      'Número Evento',
      'Evento',
      'Equipo',
      'Características',
      'Líder',
      'Liquidación',
      'Pendientes',
      'Distancia'
    ],
    encabezados: [
      'duracion',
      'paquete',
      'taller',
      'numeroEvento',
      'evento',
      'equipo',
      'caracteristicas',
      'lider',
      'liquidacion',
      'pendientes',
      'distancia'
    ],
    busqueda: true,
    titulo: 'Programación de Eventos'
  };

  datos: any[] = [];

  constructor(
    private generales: GeneralesService,
    private servicio: EventosService
  ) {}

  ngOnInit(): void {
    this.mostrar();
  }

  mostrar(): void {
    this.servicio.mostrar().subscribe(
      (respuesta: any) => {
        if (respuesta && respuesta.datos) {
          this.datos = respuesta.datos.map((evento: any) => {
            // Formatear talleres en una lista separada por comas
            const taller = evento.talleres_lista
              ? evento.talleres_lista.map((t: any) => t.nombre).join(', ')
              : (evento.taller || '');

            // Formatear el equipo (personajes asignados con su respectivo actor)
            const equipo = evento.personajes_asignados
              ? evento.personajes_asignados
                  .map((pa: any) => {
                    const personajeNom = pa.personaje?.nombre || '';
                    const actorNom = pa.actor?.nombre || 'Sin asignar';
                    return `${personajeNom} (${actorNom})`;
                  })
                  .join(', ')
              : (evento.equipo || '');

            return {
              ...evento,
              duracion: evento.duracion || '',
              paquete: evento.paquete || '',
              taller: taller,
              numeroEvento: evento.folio || '',
              evento: evento.festejado || '',
              equipo: equipo,
              caracteristicas: evento.observaciones || evento.caracteristicas || '',
              lider: evento.lider || '',
              liquidacion: evento.total_abonos || 0,
              pendientes: evento.total_liquidar || 0,
              distancia: evento.kilometros || '',
              // color se usará en app-tabla para el fondo de la fila
              color: evento.color || ''
            };
          });
        }
      },
      (error) => {
        this.generales.interpretarError(error);
      }
    );
  }
}
