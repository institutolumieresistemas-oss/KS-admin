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
    alias: ['Vale', 'Monto', 'Sucursal', 'Creo', 'Acepto'],
    encabezados: ['folio', 'monto', 'sucursal', 'creo', 'acepto'],
    busqueda: true
  };
  datos: any;
  seleccion: any;
  vista: any;
  lista: any
  
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
      this.lista = respuesta.lista;
    },
    error => {
      this.generales.interpretarError(error);
    });
  }
  
  nuevo(dato: any){
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
