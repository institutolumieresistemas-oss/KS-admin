import { Component } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { GeneralesService } from '../../servicios/generales.service';
import { TransferenciasService } from '../../servicios/transferencias.service';

@Component({
  selector: 'app-recepcion-transferencias',
  standalone: false,
  templateUrl: './recepcion-transferencias.component.html',
  styleUrl: './recepcion-transferencias.component.css'
})
export class RecepcionTransferenciasComponent {
  configuracion: datatableConfig = {
    alias: ['Monto', 'Sucursal'],
    encabezados: ['monto', 'sucursalSalida'],
    busqueda: true
  };
  datos: any;
  seleccion: any;
  vista: any;
  
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
    this.servicio.traer().subscribe((respuesta: any) => {
      this.datos = respuesta;
    },
    error => {
      this.generales.interpretarError(error);
    });
  }
  
  aceptar(){
    this.servicio.activar(this.seleccion).subscribe((respuesta: any) => {
      this.generales.mensajeCorrecto('Transferencia acepatada correctamente');
      this.datos = this.generales.actualizarDatoArray(this.datos, respuesta);
      this.seleccion = respuesta;
    },
    error => {
      this.generales.interpretarError(error);
    });
  }
  
  rechazar(){
    this.servicio.desactivar(this.seleccion).subscribe((respuesta: any) => {
      this.generales.mensajeCorrecto('Transferencia rechazada correctamente');
      this.datos = this.generales.actualizarDatoArray(this.datos, respuesta);
      this.seleccion = respuesta;
    },
    error => {
      this.generales.interpretarError(error);
    });
  }
  
}
