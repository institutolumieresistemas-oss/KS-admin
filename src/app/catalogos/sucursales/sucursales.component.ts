import { Component } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { SucursalesService } from '../../servicios/sucursales.service';
import { datatableConfig } from '../../interfaces/tables.interface';

@Component({
    selector: 'app-sucursales',
    templateUrl: './sucursales.component.html',
    styleUrl: './sucursales.component.css',
    standalone: false
})
export class SucursalesComponent {
  configuracion: datatableConfig = {
    alias: ['Nombre', 'Domicilio', 'Telefono', 'Abreviatura'],
    encabezados: ['nombre', 'domicilio', 'telefono', 'abreviatura'],
    busqueda: true
  };
  datos: any;
  seleccion: any;
  vista: any;
  
  constructor(private generales: GeneralesService, private servicio: SucursalesService){}
  
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
      this.datos = respuesta;
    },
    error => {
      this.generales.interpretarError(error);
    });
  }
  
  nuevo(dato: any){
    if(this.servicio.validar(dato)){
      this.servicio.nuevo(dato).subscribe((respuesta: any) => {
        this.generales.mensajeCorrecto(' agregado correctamente');
        this.datos = this.generales.agregarDatoArray(this.datos, respuesta);
        this.generales.cerrarModal();
      },
      error => {
        this.generales.interpretarError(error);
      });
    }
  } 
}
