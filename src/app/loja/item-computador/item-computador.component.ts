import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Computador } from '../computador.model';

@Component({
  selector: 'app-item-computador',
  templateUrl: './item-computador.component.html',
  styleUrls: ['./item-computador.component.css']
})
export class ItemComputadorComponent implements OnInit {

  @Input() computador: Computador;

  constructor() { }

  ngOnInit() {
  }

}
