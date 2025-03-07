import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeneralesService } from '../../servicios/generales.service';
import { EventosService } from '../../servicios/eventos.service';

@Component({
  selector: 'app-estado-cuenta-evento',
  templateUrl: './estado-cuenta-evento.component.html',
  styleUrl: './estado-cuenta-evento.component.css'
})
export class EstadoCuentaEventoComponent {
  cargos: any;
  abonos: any;
  gastos: any;
  vista = '';
  listas = {
    formas: [],
    cuentas: []
  }
  total = '0';
  constructor(public generales: GeneralesService, public rutaActiva: ActivatedRoute, private servicio: EventosService) { }
  
  ngOnInit(): void {
    this.obtener();
  }

  modal(vista: any){
    this.vista = '';
    this.generales.delay(500).then(fun => {
      this.vista = vista;
      this.generales.abrirModal();
    });
  }

  obtener(){
    this.servicio.estadoCuenta({id: this.rutaActiva.snapshot.params['evento']}).subscribe((respuesta: any) => {
      this.cargos = respuesta.cargos;
      this.abonos = respuesta.abonos;
      this.gastos = respuesta.gastos;
      this.listas = respuesta.listas;
      this.total = respuesta.total;
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  nuevoAbono(dato: any){
    dato.id = this.rutaActiva.snapshot.params['evento'];
    this.servicio.nuevoAbono(dato).subscribe((respuesta: any) => {
      this.generales.mensajeCorrecto('Abono agregado correctamente');
      this.obtener();
      this.generales.cerrarModal();
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  nuevoGasto(dato: any){
    dato.id = this.rutaActiva.snapshot.params['evento'];
    this.servicio.nuevoGasto(dato).subscribe((respuesta: any) => {
      this.generales.mensajeCorrecto('Gasto agregado correctamente');
      this.obtener();
      this.generales.cerrarModal();
    },
    error => {
      this.generales.interpretarError(error);
    });
  }
}
