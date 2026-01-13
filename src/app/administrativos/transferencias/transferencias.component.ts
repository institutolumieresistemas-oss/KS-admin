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
    alias: ['Monto', 'Sucursal'],
    encabezados: ['monto', 'sucursalSalida'],
    busqueda: true
  };
  datos: any;
  cargando = false;
  seleccion: any;
  vista: any;
  lista: any;
  
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
    if(this.servicio.validar(dato)){
      this.cargando = true;
      this.servicio.nuevo(dato).subscribe((respuesta: any) => {
        this.cargando = false;
        this.generales.mensajeCorrecto('Transferencia agregado correctamente');
        this.datos = this.generales.agregarDatoArray(this.datos, respuesta);
        this.generales.cerrarModal();
      },
      error => {
        this.cargando = false;
        this.generales.interpretarError(error);
      });
    }
  }
  
  eliminar(){
    this.cargando = true;
    this.servicio.eliminar(this.seleccion).subscribe((respuesta: any) => {
      this.cargando = false;
      this.generales.mensajeCorrecto('Transferencia eliminado correctamente');
      this.datos = this.generales.eliminarDatoArray(this.datos, respuesta);
      this.seleccion = undefined;
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }
  
}
