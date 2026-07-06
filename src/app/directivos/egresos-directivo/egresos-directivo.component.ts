import { Component } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { GeneralesService } from '../../servicios/generales.service';
import { EgresosService } from '../../servicios/egresos.service';

@Component({
  selector: 'app-egresos-directivo',
  standalone: false,
  templateUrl: './egresos-directivo.component.html',
  styleUrl: './egresos-directivo.component.css'
})
export class EgresosDirectivoComponent {
  configuracion: datatableConfig = {
    alias: ['Folio', 'Año', 'Fecha', 'Rubro', 'Tipo', 'Concepto', 'Forma de pago', 'Cuenta', 'Monto', 'Evento'],
    encabezados: ['folio', 'calendario', 'created_at', 'rubro', 'tipo', 'concepto', 'forma', 'cuenta', 'monto', 'evento'],
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
    this.servicio.mostrar().subscribe((respuesta: any) => {
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
        this.generales.mensajeCorrecto('egreso modificado correctamente');
        this.generales.cerrarModal();
      },
      error => {
        this.generales.interpretarError(error);
      });
    }
  }
}
