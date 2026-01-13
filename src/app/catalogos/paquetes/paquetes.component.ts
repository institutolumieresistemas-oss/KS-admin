import { Component } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { GeneralesService } from '../../servicios/generales.service';
import { PaquetesService } from '../../servicios/paquetes.service';

@Component({
    selector: 'app-paquetes',
    templateUrl: './paquetes.component.html',
    styleUrl: './paquetes.component.css',
    standalone: false
})
export class PaquetesComponent {
  configuracion: datatableConfig = {
    alias: ['Nombre'],
    encabezados: ['nombre'],
    busqueda: true
  };
  datos: any;
  cargando = false;
  seleccion: any;
  vista: any;
  
  constructor(private generales: GeneralesService, private servicio: PaquetesService){}
  
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
      this.datos = respuesta;
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }
  
  nuevo(dato: any){
    this.servicio.nuevo(dato).subscribe((respuesta: any) => {
      this.generales.mensajeCorrecto('Paquete agregado correctamente');
      this.generales.cerrarModal();
      this.mostrar();
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  modificar(dato: any){
    this.servicio.modificar(dato).subscribe((respuesta: any) => {
      this.generales.mensajeCorrecto('Paquete modificado correctamente');
      this.generales.cerrarModal();
      this.mostrar();
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  eliminar(){
    this.servicio.eliminar(this.seleccion).subscribe((respuesta: any) => {
      this.generales.mensajeCorrecto('Paquete eliminado correctamente');
      this.generales.cerrarModal();
      this.mostrar();
      this.seleccion = undefined;
    },
    error => {
      this.generales.interpretarError(error);
    });
  }
}
