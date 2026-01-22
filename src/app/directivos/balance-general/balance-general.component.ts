import { Component } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { BalancesService } from '../../servicios/balances.service';
declare var bootstrap: any;

@Component({
  selector: 'app-balance-general',
  standalone: false,
  templateUrl: './balance-general.component.html',
  styleUrl: './balance-general.component.css'
})
export class BalanceGeneralComponent {
  balances: any[] = [];

  constructor(
    public generales: GeneralesService,
    private servicio: BalancesService
  ) {}

  ngOnInit() {
    this.mostrar();
  }

  ngAfterViewInit() {
    this.initPopovers();
  }

  mostrar() {
    this.servicio.general().subscribe((respuesta: any) => {
      this.balances = respuesta;

      // esperar al render
      setTimeout(() => this.initPopovers(), 100);
    });
  }

  initPopovers() {
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    popoverTriggerList.forEach((el: any) => {
      new bootstrap.Popover(el);
    });
  }

  popoverContent(item: any): string {
    if (!item.sucursales || item.sucursales.length === 0) {
      return '<small>Sin detalle por sucursal</small>';
    }

    let html = `<div class="text-start"><strong>Sucursales</strong><hr class="my-1">`;

    item.sucursales.forEach((s: any) => {
      html += `
        <div class="mb-2">
          <strong>${s.sucursal || 'Sin nombre'}</strong><br>
          <small>Ingresos: $${this.generales.milesNumeros(s.ingresos)}</small><br>
          <small>Egresos: $${this.generales.milesNumeros(s.egresos)}</small><br>
          <small><b>Total: $${this.generales.milesNumeros(s.total)}</b></small>
        </div>
      `;
    });

    html += `</div>`;
    return html;
  }
}
