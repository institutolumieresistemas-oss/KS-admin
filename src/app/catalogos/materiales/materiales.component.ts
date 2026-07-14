import { Component, OnInit } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { GeneralesService } from '../../servicios/generales.service';
import { MaterialesService } from '../../servicios/materiales.service';
import { MaterialTiposService } from '../../servicios/material-tipos.service';

@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.component.html',
  styleUrl: './materiales.component.css',
  standalone: false
})
export class MaterialesComponent implements OnInit {
  configuracion: datatableConfig = {
    alias: ['Folio', 'Tipo de Material'],
    encabezados: ['folio', 'tipo'],
    busqueda: true
  };
  datos: any[] = [];
  tipos: any[] = [];
  vista: any;

  constructor(
    private generales: GeneralesService,
    private servicio: MaterialesService,
    private serviceTipos: MaterialTiposService
  ) {}

  ngOnInit(): void {
    this.mostrar();
  }

  modal(vista: any) {
    this.vista = '';
    this.generales.delay(500).then(() => {
      this.vista = vista;
      this.generales.abrirModal();
    });
  }

  mostrar() {
    this.serviceTipos.mostrar().subscribe((tiposRes: any) => {
      this.tipos = tiposRes || [];
      this.servicio.mostrar().subscribe((respuesta: any) => {
        const rawDatos = Array.isArray(respuesta) ? respuesta : (respuesta.datos || []);
        this.datos = rawDatos.map((d: any) => {
          const matchingTipo = this.tipos.find(t => t.id.toString() === d.idTipo.toString());
          return {
            ...d,
            tipo: matchingTipo ? matchingTipo.nombre : 'Sin tipo'
          };
        });
      }, error => {
        this.generales.interpretarError(error);
      });
    }, error => {
      this.generales.interpretarError(error);
    });
  }

  nuevo(dato: any) {
    this.servicio.nuevo(dato).subscribe((respuesta: any) => {
      this.generales.mensajeCorrecto('Material agregado correctamente');
      this.generales.cerrarModal();
      this.mostrar();
    }, error => {
      this.generales.interpretarError(error);
    });
  }
}
