import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-circulo',
  standalone: false,
  templateUrl: './circulo.component.html',
  styleUrl: './circulo.component.css'
})
export class CirculoComponent {
  @Input() dato: any;
  constructor() { }

  ngOnInit(): void {
  }

}
