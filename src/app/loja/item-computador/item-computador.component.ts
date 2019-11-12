import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Computador } from '../computador.model';

@Component({
  selector: 'app-item-computador',
  templateUrl: './item-computador.component.html',
  styleUrls: ['./item-computador.component.css']
})
export class ItemComputadorComponent implements OnInit {

  @Input() computador: Computador;
  public mensagem:string = '';

  constructor() { }

  mensagemItens(){
    this.mensagem += this.computador.placa_mae['produto']+' - ';
    this.mensagem += this.computador.processador['produto']+' - ';
    this.mensagem += this.computador.placa_video['produto']+' - ';
  }

  ngOnInit() {
    this.mensagemItens();
  }

}
