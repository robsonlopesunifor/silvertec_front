import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Computador } from './computador.model';
import { LojaService } from './loja.service';

@Component({
  selector: 'app-loja',
  templateUrl: './loja.component.html',
  styleUrls: ['./loja.component.css']
})
export class LojaComponent implements OnInit {

  private acao:string = '';
  public computador:Computador;
  public computadores:object = [
    {placa_mae:'MP',  placa_video:'#CFCDCD', processador:'#FF7D00'},
    {placa_mae:'MP',  placa_video:'#CFCDCD', processador:'#F0C18C'},
    {placa_mae:'CO',  placa_video:'#625D5D', processador:'#CFCDCD'},
    {placa_mae:'BTN', placa_video:'#CFCDCD', processador:'#3B75B6'},
    {placa_mae:'SB',  placa_video:'#CFCDCD', processador:'#81D7FD'},
    {placa_mae:'BB',  placa_video:'#CFCDCD', processador:'#81D7FD'}
  ]

  constructor(private lojaService: LojaService) { }


  listarComputador(){
    this.lojaService.listarComputador()
                    .subscribe(lista => { this.computadores = lista;
                                          console.log(lista)});
  }

  definirComputador(computador: Computador){
    this.acao = 'atualizar';
    this.computador = computador;
  }

  registrarComputador(){
    var computador_id:object = {};
    console.log(this.computador)
    for(let pecas in this.computador){
      if(pecas != 'memoria_ram'){
        computador_id[pecas] = this.computador[pecas]['id']
      }else{
        computador_id[pecas] = []
        for(var i = 0; i < this.computador[pecas].length;i++){
          var id = this.computador[pecas][i][0]['id'];
          var quantidade = this.computador[pecas][i][1]
          computador_id[pecas][i] = []
          computador_id[pecas][i][0] = id
          computador_id[pecas][i][1] = quantidade
        }
      }
    }
    console.log(computador_id)
    this.lojaService.registrarComputador(computador_id)
                    .subscribe(lista => { console.log(lista)});
  }

  novoComputador(){
    this.acao = 'criar';
    this.computador = {placa_mae:{produto:'',
                                  processador:'',
                                  quantidade_slot:'',
                                  video_integrafo:false},  
                       placa_video:{produto:''}, 
                       processador:{produto:'',
                                    marca:''},
                       memoria_ram:[]
                      }
  }

  ngOnInit(){
    
  }

}
