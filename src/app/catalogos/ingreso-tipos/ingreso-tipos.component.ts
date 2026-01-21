import { Component } from '@angular/core';
import { IngresoTiposService } from '../../servicios/ingreso-tipos.service';
import { GeneralesService } from '../../servicios/generales.service';
import { datatableConfig } from '../../interfaces/tables.interface';

@Component({
    selector: 'app-ingreso-tipos',
    templateUrl: './ingreso-tipos.component.html',
    styleUrl: './ingreso-tipos.component.css',
    standalone: false
})
export class IngresoTiposComponent {
  configuracion: datatableConfig = {
    alias: ['Nombre', 'Rubro'],
    encabezados: ['nombre', 'rubro'],
    busqueda: true
  };
  datos: any;
  seleccion: any;
  vista: any;
  lista: any;
  
  constructor(private generales: GeneralesService, private servicio: IngresoTiposService){}
  
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
