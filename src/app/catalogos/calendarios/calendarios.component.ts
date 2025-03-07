import { Component } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { GeneralesService } from '../../servicios/generales.service';
import { CalendariosService } from '../../servicios/calendarios.service';

@Component({
  selector: 'app-calendarios',
  templateUrl: './calendarios.component.html',
  styleUrl: './calendarios.component.css'
})
export class CalendariosComponent {
  configuracion: datatableConfig = {
    alias: ['Nombre'],
    encabezados: ['nombre'],
    busqueda: true
  };
  datos: any;
  cargando = false;
  seleccion: any;
  vista: any;
  
  constructor(private generales: GeneralesService, private servicio: CalendariosService){}
  
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
      this.generales.mensajeCorrecto('Rubro agregado correctamente');
      this.generales.cerrarModal();
      this.mostrar();
    },
    error => {
      this.generales.interpretarError(error);
    });
  }  
}
