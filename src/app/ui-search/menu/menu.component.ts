import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.css',
    standalone: false
})
export class MenuComponent {
  @Input() permisos: any;
  constructor(){}
}
