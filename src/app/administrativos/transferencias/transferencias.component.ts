import { Component } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { GeneralesService } from '../../servicios/generales.service';
import { TransferenciasService } from '../../servicios/transferencias.service';

@Component({
  selector: 'app-transferencias',
  standalone: false,
  templateUrl: './transferencias.component.html',
  styleUrl: './transferencias.component.css'
})
export class TransferenciasComponent {
  configuracion: datatableConfig = {
    alias: ['Folio', 'Monto', 'Sucursal', 'Folio Ingreso', 'Folio Egreso', 'Estatus'],
    encabezados: ['folio', 'monto', 'sucursal_salida', 'folio_ingreso', 'folio_egreso', 'status'],
    busqueda: true
  };
  datos: any;
  seleccion: any;
  vista: any;
  listas = {
    sucursales: []
  };
  saldo = 0;
  
  constructor(private generales: GeneralesService, private servicio: TransferenciasService){}
  
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
      this.saldo = respuesta.saldo
    },
    error => {
      this.generales.interpretarError(error);
    });
  }
  
  nuevo(dato: any){
    if(this.saldo < dato.monto){
      return this.generales.mensajeError('Saldo insuficiente en sucursal');
    }
    if(this.servicio.validar(dato)){
      this.servicio.nuevo(dato).subscribe((respuesta: any) => {
        this.generales.mensajeCorrecto('Transferencia agregado correctamente');
        this.datos = this.generales.agregarDatoArray(this.datos, respuesta);
        this.generales.cerrarModal();
      },
      error => {
        this.generales.interpretarError(error);
      });
    }
  }
  
}
