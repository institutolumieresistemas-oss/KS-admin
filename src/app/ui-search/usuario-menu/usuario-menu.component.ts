import { Component, Input } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-usuario-menu',
    templateUrl: './usuario-menu.component.html',
    styleUrl: './usuario-menu.component.css',
    standalone: false
})
export class UsuarioMenuComponent {
  @Input() usuario = {
    nombre: '',
    foto: ''
  };

  constructor(private generales: GeneralesService, private router: Router){}

  ngOnInit(){
  }

  cerrarSession(){
    this.generales.cerrarSesion();
    this.router.navigate(['login']);
  }
}
