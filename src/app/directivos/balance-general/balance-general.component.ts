import { Component } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { BalancesService } from '../../servicios/balances.service';

@Component({
  selector: 'app-balance-general',
  standalone: false,
  templateUrl: './balance-general.component.html',
  styleUrl: './balance-general.component.css'
})
export class BalanceGeneralComponent {
  balances: any;
  constructor(public generales: GeneralesService, private servicio: BalancesService){}

  ngOnInit(){
    this.mostrar();
  }

  mostrar(){
    this.servicio.general().subscribe((respuesta: any) => {
      this.balances = respuesta;
    },
    error => {
      this.generales.interpretarError(error);
    });
  }
}
