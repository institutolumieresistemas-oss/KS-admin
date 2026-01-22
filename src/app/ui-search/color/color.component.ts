import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-color',
  standalone: false,
  templateUrl: './color.component.html',
  styleUrl: './color.component.css'
})
export class ColorComponent implements OnChanges{
  /** Color inicial (HEX o RGB) */
  @Input() value: string = '#2196f3';

  /** Emite el color en formato CSS RGB */
  @Output() emitidor = new EventEmitter<string>();

  hex = '#2196f3';
  rgb = 'rgb(33, 150, 243)';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['value'] && this.value) {
      if (this.value.startsWith('rgb')) {
        this.rgb = this.value;
        this.hex = this.rgbToHex(this.value);
      } else {
        this.hex = this.value;
        this.rgb = this.hexToRgb(this.value);
      }
    }
  }

  onColorChange(event: any) {
    this.hex = event.target.value;
    this.rgb = this.hexToRgb(this.hex);
    console.log(this.hex)
    this.emitidor.emit(this.rgb);
  }

  private hexToRgb(hex: string): string {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  }

  private rgbToHex(rgb: string): string {
    const values = rgb.match(/\d+/g);
    if (!values) return '#000000';

    const [r, g, b] = values.map(v =>
      ('0' + Number(v).toString(16)).slice(-2)
    );

    return `#${r}${g}${b}`;
  }

  
}
