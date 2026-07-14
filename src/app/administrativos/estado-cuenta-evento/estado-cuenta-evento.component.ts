import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeneralesService } from '../../servicios/generales.service';
import { EventosService } from '../../servicios/eventos.service';

@Component({
    selector: 'app-estado-cuenta-evento',
    templateUrl: './estado-cuenta-evento.component.html',
    styleUrl: './estado-cuenta-evento.component.css',
    standalone: false
})
export class EstadoCuentaEventoComponent {
  cargos: any;
  abonos: any;
  gastos: any;
  vista = '';
  listas = {
    formas: [],
    cuentas: [],
    ringresos: [],
    tingresos: [],
    regresos: [],
    tgresos: [],
  }
  total = '0';
  actoresParticipantes: any[] = [];
  constructor(public generales: GeneralesService, public rutaActiva: ActivatedRoute, private servicio: EventosService) { }
  
  ngOnInit(): void {
    this.obtener();
  }

  modal(vista: any){
    this.vista = '';
    if (vista === 'nominasEventos') {
      this.obtenerActores();
    }
    this.generales.delay(500).then(fun => {
      this.vista = vista;
      this.generales.abrirModal();
    });
  }

  obtenerActores() {
    const eventoId = this.rutaActiva.snapshot.params['evento'];
    this.servicio.estadoCuenta({ id: eventoId }).subscribe((res: any) => {
      if (res.actores) {
        this.actoresParticipantes = res.actores.map((a: any) => ({
          id: a.id,
          nombre: a.nombre,
          monto: 0
        }));
      } else {
        this.actoresParticipantes = [];
      }
    }, error => {
      this.generales.interpretarError(error);
    });
  }

  obtener(){
    this.servicio.estadoCuenta({id: this.rutaActiva.snapshot.params['evento']}).subscribe((respuesta: any) => {
      this.cargos = respuesta.cargos;
      this.abonos = respuesta.abonos;
      this.gastos = respuesta.gastos;
      this.listas = respuesta.listas;
      this.total = respuesta.total;
      if (respuesta.actores) {
        this.actoresParticipantes = respuesta.actores.map((a: any) => ({
          id: a.id,
          nombre: a.nombre,
          monto: 0
        }));
      }
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
