import { Injectable } from '@angular/core';
import { Cell, PdfMakeWrapper, QR, SVG, Table, Txt, IFonts } from 'pdfmake-wrapper';
import { DatoPDFService } from './dato-pdf.service';
import { GeneralesService } from './generales.service';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';


@Injectable({
  providedIn: 'root'
})
export class PdfService {
  fonts = {
    Courier: {
      normal: 'Courier',
      bold: 'Courier-Bold',
      italics: 'Courier-Oblique',
      bolditalics: 'Courier-BoldOblique'
    },
    Helvetica: {
      normal: 'Helvetica',
      bold: 'Helvetica-Bold',
      italics: 'Helvetica-Oblique',
      bolditalics: 'Helvetica-BoldOblique'
    },
    Times: {
      normal: 'Times-Roman',
      bold: 'Times-Bold',
      italics: 'Times-Italic',
      bolditalics: 'Times-BoldItalic'
    },
    Symbol: {
      normal: 'Symbol'
    },
    ZapfDingbats: {
      normal: 'ZapfDingbats'
    }
  };
  constructor(private servicio: DatoPDFService, private generales: GeneralesService) {
  }

  async pdfIngreso(ingreso: any) {
    this.servicio.ingreso(ingreso).subscribe((respuesta: any) => {
      //let logo = this.generales.imagen;
      const pdf = new PdfMakeWrapper();
      pdf.pageMargins([ 20, 20, 20, 20 ]);
      pdf.pageSize('A4');

      if(!respuesta.activo){
        pdf.watermark(new Txt('Cancelado').color('red').end); 
      }
      pdf.watermark('PRUEBA');
      pdf.create().open();
    },
    error => {
      this.generales.interpretarError(error);
    });
  }


  async pdfCorte(body: any) {
    /*this.servicio.corte(body).subscribe((respuesta: any) => {
      let logo = this.generales.logos;
      const pdf = new PdfMakeWrapper();
      pdf.pageMargins([ 20, 20, 20, 20 ]);
      pdf.pageSize('A4');

      
      let columnaLogotipo = new Table([
        [{image: logo, width: 64, height: 20}]
      ]).layout('noBorders').widths(['100%']).end;
      pdf.add(columnaLogotipo);

      let encabezado = new Txt('Corte de Caja:').fontSize(15).alignment('center').color('#2F75B5').end;
      let columnaEncabezado = new Table([
        [encabezado]
      ]).layout('noBorders').widths(['100%']).alignment('center').end;
      pdf.add(columnaEncabezado);
      pdf.add(pdf.ln(2));

      let informacionEmpleado = new Table([
        [
          new Cell(new Txt('Fecha del Corte: ' + respuesta.fechaCorte).fontSize(12).end).alignment('left').end,
          new Cell(new Txt('Usuario: ' + respuesta.usuario).fontSize(12).end).alignment('right').end
        ]
      ]).widths(['50%', '50%']).alignment('center').layout('noBorders').end;
      pdf.add(informacionEmpleado);
      pdf.add(pdf.ln(2));

      //Ingresos Agregados
      if(respuesta.ingresos.length > 0){
        let encabezadoIngresos = new Table([
          [
            new Cell(new Txt('Ingresos').fontSize(10).bold().end).alignment('left').end,
          ]
        ]).widths(['100%']).layout('noBorders').end;
        pdf.add(encabezadoIngresos);
  
        let tablaIngresosAgregados = new Table([
          [
            new Cell(new Txt('Folio').fontSize(10).color('white').bold().end).fillColor('#2F75B5').end,
            new Cell(new Txt('Rubro').fontSize(10).color('white').bold().end).fillColor('#2F75B5').end,
            new Cell(new Txt('Concepto').fontSize(10).color('white').bold().end).fillColor('#2F75B5').end,
            new Cell(new Txt('Monto').fontSize(10).color('white').bold().end).fillColor('#2F75B5').end,
            new Cell(new Txt('Forma de Pago').fontSize(10).color('white').bold().end).fillColor('#2F75B5').end,
            new Cell(new Txt('Referencia').fontSize(10).color('white').bold().end).fillColor('#2F75B5').end,
            new Cell(new Txt('Fecha').fontSize(10).color('white').bold().end).fillColor('#2F75B5').end,
          ]
        ]).widths(['10%', '14%', '20%', '13%', '15%', '11%', '17%']).alignment('center').end;
        pdf.add(tablaIngresosAgregados);
        
        let ingreso = new Table(
          respuesta.ingresos
        ).widths(['10%', '14%', '20%', '13%', '15%', '11%', '17%']).fontSize(8).bold().alignment('center').end
        pdf.add(ingreso);
        pdf.add(pdf.ln(1));
  
        let totalesEncabezado = new Table([
          [
            new Cell(new Txt('Totales Ingresos').fontSize(10).color('white').bold().end).fillColor('#2F75B5').alignment('center').colSpan(2).end,
          ]
        ]).widths(['20%', '20%']).end;
        pdf.add(totalesEncabezado);
  
        let totalIngresos = new Table(
          respuesta.totalIngresos
        ).widths(['20%', '20%']).fontSize(8).bold().end
        pdf.add(totalIngresos);
  
        pdf.add(pdf.ln(1));
      }else{
        let encabezadoIngresos = new Table([
          [
            new Cell(new Txt('No hay ingresos').fontSize(10).bold().end).alignment('left').end,
          ]
        ]).widths(['100%']).layout('noBorders').end;
        pdf.add(encabezadoIngresos);
      }

      //Egresos Agregados
      if(respuesta.egresos.length > 0){
        let encabezadoEgresos = new Table([
          [
            new Cell(new Txt('Egresos').fontSize(10).bold().end).alignment('left').end,
          ]
        ]).widths(['100%']).layout('noBorders').end;
        pdf.add(encabezadoEgresos);
  
        let tablaEgresosAgregados = new Table([
          [
            new Cell(new Txt('Folio').fontSize(10).color('white').bold().end).fillColor('#2F75B5').end,
            new Cell(new Txt('Rubro').fontSize(10).color('white').bold().end).fillColor('#2F75B5').end,
            new Cell(new Txt('Concepto').fontSize(10).color('white').bold().end).fillColor('#2F75B5').end,
            new Cell(new Txt('Monto').fontSize(10).color('white').bold().end).fillColor('#2F75B5').end,
            new Cell(new Txt('Forma de Pago').fontSize(10).color('white').bold().end).fillColor('#2F75B5').end,
            new Cell(new Txt('Referencia').fontSize(10).color('white').bold().end).fillColor('#2F75B5').end,
            new Cell(new Txt('Fecha').fontSize(10).color('white').bold().end).fillColor('#2F75B5').end,
          ]
        ]).widths(['10%', '14%', '20%', '13%', '15%', '11%', '17%']).alignment('center').end;
        pdf.add(tablaEgresosAgregados);
        
        let egreso = new Table(
          respuesta.egresos
        ).widths(['10%', '14%', '20%', '13%', '15%', '11%', '17%']).fontSize(8).bold().alignment('center').end
        pdf.add(egreso);
        pdf.add(pdf.ln(1));
  
        let totalesEncabezadoE = new Table([
          [
            new Cell(new Txt('Totales Egresos').fontSize(10).color('white').bold().end).fillColor('#2F75B5').alignment('center').colSpan(2).end,
          ]
        ]).widths(['20%', '20%']).end;
        pdf.add(totalesEncabezadoE);
  
        let totalEgresos = new Table(
          respuesta.totalEgresos
        ).widths(['20%', '20%']).fontSize(8).bold().end
        pdf.add(totalEgresos);
  
        pdf.add(pdf.ln(1));
      }else{
        let encabezadoEgresos = new Table([
          [
            new Cell(new Txt('No hay egresos').fontSize(10).bold().end).alignment('left').end,
          ]
        ]).widths(['100%']).layout('noBorders').end;
        pdf.add(encabezadoEgresos);
      }

      //Inscripciones
      if(respuesta.inscripciones.length > 0){
        let encabezadoInscripciones = new Table([
          [
            new Cell(new Txt('Inscripciones').fontSize(10).bold().end).alignment('left').end,
          ]
        ]).widths(['100%']).layout('noBorders').end;
        pdf.add(encabezadoInscripciones);
  
        let tablaInscripciones = new Table([
          [
            new Cell(new Txt('Alumno').fontSize(10).color('white').bold().end).fillColor('#2F75B5').end,
            new Cell(new Txt('Ficha').fontSize(10).color('white').bold().end).fillColor('#2F75B5').end,
            new Cell(new Txt('Fecha').fontSize(10).color('white').bold().end).fillColor('#2F75B5').end
          ]
        ]).widths(['50%', '25%', '25%']).alignment('center').end;
        pdf.add(tablaInscripciones);
        
        let inscripciones = new Table(
          respuesta.inscripciones
        ).widths(['50%', '25%', '25%']).fontSize(8).bold().alignment('center').end
        pdf.add(inscripciones);
        pdf.add(pdf.ln(1));
      }else{
        let encabezadoIncripciones = new Table([
          [
            new Cell(new Txt('No hay inscripciones').fontSize(10).bold().end).alignment('left').end,
          ]
        ]).widths(['100%']).layout('noBorders').end;
        pdf.add(encabezadoIncripciones);
      }

      pdf.add(pdf.ln(2));

      //Saldos
      let encabezadoSaldos = new Table([
        [
          new Cell(new Txt('Saldos').fontSize(10).bold().end).alignment('left').end,
        ]
      ]).widths(['100%']).layout('noBorders').end;
      pdf.add(encabezadoSaldos);

      let saldo = respuesta.saldoTotal;
      let saldoInicial = parseFloat(saldo);
      saldoInicial = saldoInicial + parseFloat(respuesta.montoEgresos);
      saldoInicial = saldoInicial - parseFloat(respuesta.montoIngresos);

      let tablaInscripciones = new Table([
        [
          new Cell(new Txt('Saldo inicial en sucursal').fontSize(10).color('white').bold().end).fillColor('#2F75B5').end,
          new Cell(new Txt('$' + this.generales.milesNumeros(saldoInicial.toString())).fontSize(10).bold().end).end
        ],
        [
          new Cell(new Txt('Saldo actual en sucursal').fontSize(10).color('white').bold().end).fillColor('#2F75B5').end,
          new Cell(new Txt('$' + this.generales.milesNumeros(respuesta.saldoTotal)).fontSize(10).bold().end).end
        ],
        [
          new Cell(new Txt('Saldo en vale administrativo').fontSize(10).color('white').bold().end).fillColor('#2F75B5').end,
          new Cell(new Txt('$' + this.generales.milesNumeros(respuesta.vale)).fontSize(10).bold().end).end
        ]
      ]).widths(['40%', '20%']).alignment('center').end;
      pdf.add(tablaInscripciones);

      pdf.add(pdf.ln(10));


      let decimaFila1 = new Table([
        [
          new Cell(new Txt('__________________________________').bold().fontSize(8).end).end,
        ]]).widths(['100%']).alignment('center').layout('noBorders').end;
      pdf.add(decimaFila1);

      let onceavaFila1 = new Table([
        [
          new Cell(new Txt('FIRMA ASESOR').bold().fontSize(8).end).end,
        ]]).widths(['100%']).alignment('center').layout('noBorders').end;
        pdf.add(onceavaFila1);

        pdf.add(pdf.ln(1));

      pdf.create().open();
      
    },
    error => {
      this.generales.interpretarError(error);
    });*/
  }
}
