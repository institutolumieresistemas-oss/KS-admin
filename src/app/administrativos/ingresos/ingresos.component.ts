import { Component } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { GeneralesService } from '../../servicios/generales.service';
import { IngresosService } from '../../servicios/ingresos.service';
import { PdfService } from '../../servicios/pdf.service';

@Component({
    selector: 'app-ingresos',
    templateUrl: './ingresos.component.html',
    styleUrl: './ingresos.component.css',
    standalone: false
})
export class IngresosComponent {
  configuracion: datatableConfig = {
    alias: ['Folio', 'Calendario', 'Monto', 'Forma de pago', 'Rubro', 'Tipo'],
    encabezados: ['folio', 'calendario', 'monto', 'forma', 'rubro', 'tipo'],
    busqueda: true
  };
  datos: any;
  cargando = false;
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
  
  constructor(private generales: GeneralesService, private servicio: IngresosService, private pdf:PdfService){}
  
  ngOnInit(): void {
    this.mostrar();
  }

  imprimir(){
    this.pdf.pdfIngreso(this.seleccion);
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
      this.listas = respuesta.listas;
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }
  
  nuevo(dato: any){
    if(this.servicio.validar(dato)){
      this.servicio.nuevo(dato).subscribe((respuesta: any) => {
        this.generales.mensajeCorrecto('Ingreso agregado correctamente');
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
      this.servicio.solicitud(dato).subscribe((respuesta: any) => {
        this.generales.mensajeCorrecto('solicitud enviada correctamente');
        this.generales.cerrarModal();
      },
      error => {
        this.generales.interpretarError(error);
      });
    }
  }
}
