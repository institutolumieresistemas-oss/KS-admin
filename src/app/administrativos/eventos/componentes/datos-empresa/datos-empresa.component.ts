import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-datos-empresa',
  templateUrl: './datos-empresa.component.html',
  styleUrl: './datos-empresa.component.css'
})
export class DatosEmpresaComponent {
  empresa = {
    fecha: '',
    hora: '',
    idPaquete: 0,
    monto: '',
    idMedio: 0,
    idMotivo: 0,
    domicilio: '',
    mapa: '',
    observaciones: '',
    idCalendario: 0,
    idSemana: 0,
    anticipo: '',
    idFormaPago: 0,
    idCuenta: 0
  }
  @Input() medios: any;
  @Input() motivos: any;
  @Input() paquetes: any;
  @Input() calendarios: any;
  @Input() semanas: any;
  @Input() formas: any;
  @Input() cuentas: any;
  @Output() siguiente = new EventEmitter();
  @Output() anterior = new EventEmitter();
  
  constructor(){}

  ngOnInit(){
    
  }

  continuar(){
    this.siguiente.emit(this.empresa);
  }

  cancelar(){
    this.anterior.emit(this.empresa);
  }
}
