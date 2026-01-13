import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-meta-ingreso',
  standalone: false,
  templateUrl: './modal-meta-ingreso.component.html',
  styleUrl: './modal-meta-ingreso.component.css'
})
export class ModalMetaIngresoComponent {
  @Output() emitidor = new EventEmitter<any>();
    @Input() dato = {
      cantidad: '',
      idUsuario: 0,
      idCalendario: 0,
      mes: 0
    };
    @Input() lista = {
      usuarios: [],
      calendarios: []
    };
    @Input() modificar = false;
    meses: any;
    constructor(private generales: GeneralesService) { }
    
    ngOnInit(): void {
      this.meses = this.generales.meses;
    }
    
    emitir() {
      this.emitidor.emit(this.dato);
    }
    
    cerrar() {
      this.generales.cerrarModal();
    }
}
