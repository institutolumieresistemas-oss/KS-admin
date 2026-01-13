import { Component } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { GeneralesService } from '../../servicios/generales.service';
import { ValesService } from '../../servicios/vales.service';

@Component({
  selector: 'app-recepcion-vales',
  standalone: false,
  templateUrl: './recepcion-vales.component.html',
  styleUrl: './recepcion-vales.component.css'
})
export class RecepcionValesComponent {
  configuracion: datatableConfig = {
    alias: ['Vale', 'Monto', 'Sucursal'],
    encabezados: ['folio', 'monto', 'sucursal'],
    busqueda: true
  };
  datos: any;
  cargando = false;
  seleccion: any;
  vista: any;
  
  constructor(private generales: GeneralesService, private servicio: ValesService){}
  
  ngOnInit(): void {
    this.mostrar();
  }
  
  mostrar(){
    this.cargando = true;
    this.servicio.traer().subscribe((respuesta: any) => {
      this.cargando = false;
      this.datos = respuesta;
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  aceptar(){
    this.servicio.aceptar(this.seleccion).subscribe((respuesta: any) => {
      this.generales.mensajeCorrecto('Vale aceptado correctamete');
      this.mostrar();
    },
    error => {
      this.generales.interpretarError(error);
    });
  }
}
