import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
declare function base64(archivo: File): void;

@Component({
  selector: 'app-imagen',
  templateUrl: './imagen.component.html',
  styleUrl: './imagen.component.css'
})
export class ImagenComponent {
  @Input() activo = false;
  @Input() valor = '';
  @Input() imagen = '';
  @Output() emitidor = new EventEmitter<any>();
  constructor(private generales: GeneralesService) { }

  ngOnInit() {
    this.imagen = (this.imagen.length === 0) ? this.generales.imagen : this.imagen;
  }

  emitir(value: any) {
    base64(value.files[0]);
    this.generales.delay(1000).then(fun => {
      const img = localStorage.getItem('codificacion');
      localStorage.removeItem('codificacion');
      this.emitidor.emit(img);
    });
  }
}
