import { Component } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { GeneralesService } from '../../servicios/generales.service';
import { EgresoTiposService } from '../../servicios/egreso-tipos.service';

@Component({
    selector: 'app-egreso-tipos',
    templateUrl: './egreso-tipos.component.html',
    styleUrl: './egreso-tipos.component.css',
    standalone: false
})
export class EgresoTiposComponent {
  configuracion: datatableConfig = {
    alias: ['Nombre', 'Rubro'],
    encabezados: ['nombre', 'rubro'],
    busqueda: true
  };
  datos: any;
  seleccion: any;
  vista: any;
  lista: any;
  
  constructor(private generales: GeneralesService, private servicio: EgresoTiposService){}
  
  ngOnInit(): void {
    this.mostrar();
  }
  
  modal(vista: any){
    this.vista = '';
    this.generales.delay(500).then(fun => {
      this.vista = vista;
      this.generales.abrirModal();
    });
  }
  
  mostrar(){
    this.servicio.mostrar().subscribe((respuesta: any) => {
      this.datos = respuesta.datos;
      this.lista = respuesta.lista;
    },
    error => {
      this.generales.interpretarError(error);
    });
  }
  
  nuevo(dato: any){
    this.servicio.nuevo(dato).subscribe((respuesta: any) => {
      this.generales.mensajeCorrecto('Tipo agregado correctamente');
      this.generales.cerrarModal();
      this.mostrar();
    },
    error => {
      this.generales.interpretarError(error);
    });
  }  
}
