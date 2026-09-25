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
    alias: ['Folio', 'Año', 'Fecha', 'Rubro', 'Tipo', 'Concepto', 'Forma de pago', 'Cuenta', 'Monto', 'Evento'],
    encabezados: ['folio', 'calendario', 'created_at', 'rubro', 'tipo', 'concepto', 'forma', 'cuenta', 'monto', 'evento'],
    busqueda: true
  };
  datos: any;
  seleccion: any;
  vista: any;
  cargandoImagen: boolean = false;
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
    if ((vista === 'imagen' || vista === 'modificar') && this.seleccion && this.seleccion.id && !this.seleccion.imagen) {
      this.cargandoImagen = true;
      this.vista = vista;
      this.generales.abrirModal();
      this.servicio.voucher(this.seleccion.id).subscribe((res: any) => {
        if (res && res.imagen) {
          this.seleccion.imagen = res.imagen;
        }
        this.cargandoImagen = false;
      }, err => {
        this.cargandoImagen = false;
      });
      return;
    }

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
      this.servicio.modificar(dato).subscribe((respuesta: any) => {
        this.generales.mensajeCorrecto('solicitud enviada correctamente');
        this.generales.cerrarModal();
        this.mostrar();
      },
      error => {
        this.generales.interpretarError(error);
      });
    }
  }
}
