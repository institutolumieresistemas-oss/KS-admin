import { Component } from '@angular/core';
import { EventosService } from '../../servicios/eventos.service';

@Component({
  selector: 'app-calendario',
  standalone: false,
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent {

  currentDate = new Date();
  selectedMonth = this.currentDate.toISOString().slice(0,7);

  days: any[] = [];
  events: any[] = [];
  totalMes = 0;

  constructor(private servicio: EventosService) {}

  ngOnInit() {
    this.loadCalendar();
  }

  loadCalendar() {
    this.servicio.eventos({ month: this.selectedMonth }).subscribe((events: any) => {
  
      this.events = events || [];
  
      // 🔥 Calcular total real del mes
      this.totalMes = this.events.reduce((acc: number, item: any) => {
        return acc + Number(item.total);
      }, 0);
  
      this.generateMonth();
    });
  }


  changeMonth() {

    const parts = this.selectedMonth.split('-');
    const year = Number(parts[0]);
    const month = Number(parts[1]) - 1; // JS empieza en 0
  
    this.currentDate = new Date(year, month, 1);
  
    this.loadCalendar();
  }


  generateMonth() {
    this.days = [];
  
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
  
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
  
    for (let i = 0; i < firstDay; i++) {
      this.days.push(null);
    }
  
    for (let day = 1; day <= daysInMonth; day++) {

      const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
      const eventData = this.events.find(e => e.dia.trim() === date);
    
      this.days.push({
        day,
        date,
        total: eventData ? Number(eventData.total) : 0,
        folios: eventData ? eventData.folios : ''
      });
    }
  }


  getColorClass(total: number) {
    if (total >= 1 && total <= 3) return 'verde';
    if (total >= 4 && total <= 6) return 'amarillo';
    if (total >= 7) return 'rojo';
    return '';
  }
}
