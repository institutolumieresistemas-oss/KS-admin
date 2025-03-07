import { Component } from '@angular/core';
import { IngresoTiposService } from '../../servicios/ingreso-tipos.service';
import { GeneralesService } from '../../servicios/generales.service';
import { datatableConfig } from '../../interfaces/tables.interface';

@Component({
  selector: 'app-ingreso-tipos',
  templateUrl: './ingreso-tipos.component.html',
  styleUrl: './ingreso-tipos.component.css'
})
export class IngresoTiposComponent {
  configuracion: datatableConfig = {
    alias: ['Nombre', 'Rubro'],
    encabezados: ['nombre', 'rubro'],
    busqueda: true
  };
  datos: any;
  cargando = false;
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
    this.cargando = true;
    this.servicio.mostrar().subscribe((respuesta: any) => {
      this.cargando = false;
      this.datos = respuesta.datos;
      this.lista = respuesta.lista;
    },
    error => {
      this.cargando = false;
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
