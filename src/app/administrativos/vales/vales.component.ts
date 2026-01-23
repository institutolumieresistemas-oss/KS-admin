import { Component } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { ValesService } from '../../servicios/vales.service';
import { datatableConfig } from '../../interfaces/tables.interface';

@Component({
  selector: 'app-vales',
  standalone: false,
  templateUrl: './vales.component.html',
  styleUrl: './vales.component.css'
})
export class ValesComponent {
  configuracion: datatableConfig = {
    alias: ['Vale', 'Monto', 'Sucursal', 'Creo', 'Acepto', 'Estatus', 'Folio Egreso', 'Folio Ingreso'],
    encabezados: ['folio', 'monto', 'sucursal_salida', 'creo', 'acepto', 'status', 'folio_egreso', 'folio_ingreso'],
    busqueda: true
  };
  datos: any;
  seleccion: any;
  vista: any;
  saldo = 0;
  
  constructor(private generales: GeneralesService, private servicio: ValesService){}
  
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
      this.saldo = respuesta.saldo;
    },
    error => {
      this.generales.interpretarError(error);
    });
  }
  
  nuevo(dato: any){
    if(this.saldo < dato.monto){
      return this.generales.mensajeError('No tienes suficiente saldo en tu sucursal para hacer este vale');
    }
    if(this.servicio.validar(dato)){
      this.servicio.nuevo(dato).subscribe((respuesta: any) => {
        this.generales.mensajeCorrecto('Vale agregado correctamente');
        this.generales.cerrarModal();
        this.mostrar();
      },
      error => {
        this.generales.interpretarError(error);
      });
    }
  }
}
