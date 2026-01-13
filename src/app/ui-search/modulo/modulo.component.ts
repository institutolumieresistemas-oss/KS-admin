import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-modulo',
    templateUrl: './modulo.component.html',
    styleUrl: './modulo.component.css',
    standalone: false
})
export class ModuloComponent {
  @Input() modulo: any;

  constructor(){}
}
