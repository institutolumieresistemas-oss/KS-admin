import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-checktimes',
    templateUrl: './checktimes.component.html',
    styleUrl: './checktimes.component.css',
    standalone: false
})
export class ChecktimesComponent {
  @Input() activo = false;
    @Output() emitidor = new EventEmitter<boolean>();
    @Input() texto = '';
    @Input() icono = '';
    cambio() {
      this.emitidor.emit(this.activo);
    }
}
