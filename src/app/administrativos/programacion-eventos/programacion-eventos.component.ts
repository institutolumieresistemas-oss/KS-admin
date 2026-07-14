import { Component, OnInit } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { GeneralesService } from '../../servicios/generales.service';
import { EventosService } from '../../servicios/eventos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-programacion-eventos',
  templateUrl: './programacion-eventos.component.html',
  styleUrl: './programacion-eventos.component.css',
  standalone: false
})
export class ProgramacionEventosComponent implements OnInit {
  configuracion: datatableConfig = {
    alias: [
      'Paquete',
      'Taller',
      'Número Evento',
      'Evento',
      'Equipo',
      'Características',
      'Observaciones',
      'Líder',
      'Precio',
      'Apartado',
      'Pendientes',
      'Distancia',
      'Materiales'
    ],
    encabezados: [
      'paquete',
      'talleres_desgloce',
      'numeroEvento',
      'evento_desgloce',
      'equipo',
      'caracteristicas',
      'observaciones',
      'lider',
      'precio',
      'liquidacion',
      'pendientes',
      'kilometros',
      'materiales_desgloce'
    ],
    busqueda: true,
    titulo: 'Programación de Eventos'
  };

  listado: any[] = [];
  datos: any[] = [];
  semanas: any;

  constructor(
    private generales: GeneralesService,
    private servicio: EventosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.mostrar();
  }

  mostrar(): void {
    this.servicio.mostrar().subscribe(
      (respuesta: any) => {
        if (respuesta && respuesta.datos) {
          const mapped = respuesta.datos.map((evento: any) => {
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
              caracteristicas: evento.caracteristicas || '',
              observaciones: evento.observaciones || '',
              lider: evento.lider || '',
              precio: evento.monto || 0,
              liquidacion: evento.total_abonos || 0,
              pendientes: evento.total_liquidar || 0,
              distancia: evento.kilometros || '',
              // color se usará en app-tabla para el fondo de la fila
              color: evento.color || ''
            };
          });

          this.listado = mapped;
          this.datos = mapped;
          if (respuesta.listas) {
            this.semanas = respuesta.listas.semanas;
          }
        }
      },
      (error) => {
        this.generales.interpretarError(error);
      }
    );
  }

  buscar(semana: any): void {
    if (this.generales.validarEntero(semana)) {
      // Si no hay semana válida seleccionada, mostrar todos los datos
      this.datos = this.listado;
      return;
    }

    this.datos = this.listado.filter((evento: any) =>
      Number(evento.semana) === Number(semana)
    );
  }

  editar(evento: any): void {
    this.router.navigate(['admin/informacionEvento', evento.id]);
  }
}
