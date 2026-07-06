import { Component } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { GeneralesService } from '../../servicios/generales.service';
import { EgresosService } from '../../servicios/egresos.service';

@Component({
    selector: 'app-egresos',
    templateUrl: './egresos.component.html',
    styleUrl: './egresos.component.css',
    standalone: false
})
export class EgresosComponent {
  configuracion: datatableConfig = {
    alias: ['Folio', 'Calendario', 'Monto', 'Forma de pago', 'Rubro', 'Tipo'],
    encabezados: ['folio', 'calendario', 'monto', 'forma', 'rubro', 'tipo'],
    busqueda: true
  };
  datos: any;
  seleccion: any;
  vista: any;
  listas = {
    conceptos: [],
    rubros: [],
    tipos: [],
    calendarios: [],
    formas: [],
    cuentas: []
  }
  
  constructor(private generales: GeneralesService, private servicio: EgresosService){}
  
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
    this.servicio.administrativos().subscribe((respuesta: any) => {
      this.datos = respuesta.datos;
      this.listas = respuesta.listas;
    },
    error => {
      this.generales.interpretarError(error);
    });
  }
  
  nuevo(dato: any){
    if(this.servicio.validar(dato)){
      this.servicio.nuevo(dato).subscribe((respuesta: any) => {
        this.generales.mensajeCorrecto('Egreso agregado correctamente');
        this.generales.cerrarModal();
        this.mostrar();
      },
      error => {
        this.generales.interpretarError(error);
      });
    }
  }

  solicitud(dato: any){
    if(this.servicio.validar(dato)){
      this.servicio.modificar(dato).subscribe((respuesta: any) => {
        this.generales.mensajeCorrecto('solicitud enviada correctamente');
        this.generales.cerrarModal();
      },
      error => {
        this.generales.interpretarError(error);
      });
    }
  }
}
