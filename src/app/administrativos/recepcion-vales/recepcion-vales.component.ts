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
    alias: ['Vale', 'Monto', 'Sucursal', 'Creo'],
    encabezados: ['folio', 'monto', 'sucursal', 'creo'],
    busqueda: true
  };
  datos: any;
  seleccion: any;
  vista: any;
  
  constructor(private generales: GeneralesService, private servicio: ValesService){}
  
  ngOnInit(): void {
    this.mostrar();
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
    this.servicio.aceptar(this.seleccion).subscribe((respuesta: any) => {
      this.generales.mensajeCorrecto('Vale aceptado correctamete');
      this.mostrar();
    },
    error => {
      this.generales.interpretarError(error);
    });
  }
}
