import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-top',
  standalone: false,
  templateUrl: './top.component.html',
  styleUrl: './top.component.css'
})
export class TopComponent {
  @Input() datos: { datos: any[]; titulo: string } = {
    datos: [],
    titulo: ''
  };

  @Input() titulo = '';

  ngOnInit(){}
}
