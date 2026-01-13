import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
    selector: 'app-modal-medio-publicitario',
    templateUrl: './modal-medio-publicitario.component.html',
    styleUrl: './modal-medio-publicitario.component.css',
    standalone: false
})
export class ModalMedioPublicitarioComponent {
  @Output() emitidor = new EventEmitter<any>();
    @Input() dato = {
      nombre: '',
    };
    @Input() modificar = false;
    constructor(private generales: GeneralesService) { }
    
    ngOnInit(): void {
    }
    
    emitir() {
      this.emitidor.emit(this.dato);
    }
    
    cerrar() {
      this.generales.cerrarModal();
    }
}
