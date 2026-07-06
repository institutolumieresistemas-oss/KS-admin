import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';
import { EventosService } from '../../../../servicios/eventos.service';

@Component({
    selector: 'app-modal-evento',
    templateUrl: './modal-evento.component.html',
    styleUrl: './modal-evento.component.css',
    standalone: false
})
export class ModalEventoComponent {
  @Output() emitidor = new EventEmitter<any>();
  dato = {
    cliente: {
      festejado: '',
      edad: '',
      cantidad: '',
      nombre: '',
      celular: ''
    },
    empresa: {
      fecha: '',
      hora: '',
      idPaquete: 0,
      monto: '',
      idMedio: 0,
      idMotivo: 0,
      domicilio: '',
      mapa: '',
      observaciones: '',
      anticipo: '',
      idFormaPago: 0,
      idCuenta: 0
    },
    personajes: []
  };
  paso = 0;
  @Input() listas = {
    paquetes: [],
    medios: [],
    motivos: [],
    personajes: [],
    calendarios: [],
    semanas: [],
    formas: [],
    cuentas: [],
    talleres: []
  }
  constructor(private generales: GeneralesService, private servicio: EventosService) { }
  
  ngOnInit(): void {
  }
  
  emitir() {
    this.emitidor.emit(this.dato);
  }
  
  cerrar() {
    this.generales.cerrarModal();
  }

  validarCliente(datos: any){
    this.dato.cliente = datos;
    this.paso = 1;
  }

  validarEvento(datos: any){
    this.dato.empresa = datos;
    this.paso = 2;
  }

  validarPersonajes(dato: any){
    this.dato.personajes = dato;
    this.emitidor.emit(this.dato);
  }
}
