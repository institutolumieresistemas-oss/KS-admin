import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-datos-empresa',
    templateUrl: './datos-empresa.component.html',
    styleUrl: './datos-empresa.component.css',
    standalone: false
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
    anticipo: '',
    idFormaPago: 0,
    idCuenta: 0,
    talleres: '',
    voucher: ''
  }
  @Input() medios: any;
  @Input() motivos: any;
  @Input() paquetes: any;
  @Input() calendarios: any;
  @Input() semanas: any;
  @Input() formas: any;
  @Input() cuentas: any;
  @Input() talleres: any;
  @Output() siguiente = new EventEmitter();
  @Output() anterior = new EventEmitter();
  
  constructor(){}

  ngOnInit(){
    
  }

  continuar(){
    console.log(this.empresa);
    this.siguiente.emit(this.empresa);
  }

  cancelar(){
    this.anterior.emit(this.empresa);
  }

  toJson(conversion: any) {
    return JSON.stringify(conversion.map((e: any) => ({ id: e.id })));
  }

}
