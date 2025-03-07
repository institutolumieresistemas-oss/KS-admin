import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginador',
  templateUrl: './paginador.component.html',
  styleUrl: './paginador.component.css'
})
export class PaginadorComponent {
  @Input() paginas = 0;
  @Output() emitidor = new EventEmitter<any>();
  datos = new Array();
  inicio = 0;
  seleccion = 1;
  constructor(){}

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.paginas = changes['paginas'].currentValue;
  }

  anterior(){
    if(this.inicio > 0){
      this.inicio = this.inicio - 1;
    }
  }

  siguiente(){
    if(this.inicio < this.paginas - 5){
      this.inicio = this.inicio + 1;
    }
  }

  primero(){
    this.inicio = 0;
  }

  final(){
    if(this.paginas > 6){
      this.inicio = this.paginas - 5;
    }else{
      this.inicio = this.paginas-1;
    }
  }

  ultima(){
    if(this.paginas > 6){
      this.inicio = this.paginas - 5;
    }else{
      this.inicio = this.paginas;
    }
    this.seleccion = this.paginas;
    this.emitir(this.paginas);
  }

  emitir(i: any){
    this.seleccion = i;
    this.emitidor.emit(i);
  }
}
