import { Component, OnInit } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { GeneralesService } from '../../servicios/generales.service';
import { MaterialTiposService } from '../../servicios/material-tipos.service';

@Component({
  selector: 'app-material-tipos',
  templateUrl: './material-tipos.component.html',
  styleUrl: './material-tipos.component.css',
  standalone: false
})
export class MaterialTiposComponent implements OnInit {
  configuracion: datatableConfig = {
    alias: ['Nombre'],
    encabezados: ['nombre'],
    busqueda: true
  };
  datos: any;
  seleccion: any;
  vista: any;

  constructor(private generales: GeneralesService, private servicio: MaterialTiposService) {}

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
    this.servicio.mostrar().subscribe((respuesta: any) => {
      this.datos = respuesta;
    }, error => {
      this.generales.interpretarError(error);
    });
  }

  nuevo(dato: any) {
    this.servicio.nuevo(dato).subscribe((respuesta: any) => {
      this.generales.mensajeCorrecto('Tipo de material agregado correctamente');
      this.generales.cerrarModal();
      this.mostrar();
    }, error => {
      this.generales.interpretarError(error);
    });
  }
}
