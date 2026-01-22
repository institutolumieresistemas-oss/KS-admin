import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-multiselect',
  standalone: false,
  templateUrl: './multiselect.component.html',
  styleUrl: './multiselect.component.css'
})
export class MultiselectComponent {

  menuOpen = false;

  @Input() etiqueta = '';
  @Input() lista: any[] = [];
  @Input() seleccion: any[] = [];
  @Input() mostrar = false;

  @Output() emitidor = new EventEmitter<any[]>();
  @Output() enter = new EventEmitter<any[]>(); // 🔥 NUEVO OUTPUT

  items: any[] = [];
  selectedItems: any[] = [];

  ngOnInit() {
    this.selectedItems = [...this.seleccion];

    this.items = this.lista.filter(item =>
      !this.selectedItems.some(s => s.id === item.id)
    );
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  select(item: any) {
    this.selectedItems.push(item);
    this.items = this.items.filter(x => x.id !== item.id);

    this.emitidor.emit(this.selectedItems);
  }

  remove(item: any) {
    this.selectedItems = this.selectedItems.filter(x => x.id !== item.id);
    this.items.push(item);

    this.emitidor.emit(this.selectedItems);
  }

  emitEnter() {
      // emitir selección actual
      this.enter.emit(this.selectedItems);
    
      // cerrar menú
      this.menuOpen = false;
    }
}
