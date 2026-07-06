import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.css',
    standalone: false
})
export class MenuComponent {

  @Input() permisos: any;

  menuAbierto = false;
  moduloAbierto: any = null;

  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
    if (!this.menuAbierto) {
      this.moduloAbierto = null;
    }
  }

  cerrarMenu() {
    this.menuAbierto = false;
    this.moduloAbierto = null;
  }

  toggleModulo(modulo: any) {
    this.moduloAbierto =
      this.moduloAbierto === modulo ? null : modulo;
  }
}