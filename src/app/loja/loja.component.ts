import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Computador } from './computador.model';
import { LojaService } from './loja.service';
import { Router } from '@angular/router';
import { PecasComputadorComponent } from './pecas-computador/pecas-computador.component';

@Component({
  selector: 'app-loja',
  templateUrl: './loja.component.html',
  styleUrls: ['./loja.component.css']
})
export class LojaComponent implements OnInit {

  public ocutar_caixa_item:boolean = false;
  public acao:string = '';
  public computador:Computador;
  public computadores:object = []
  public mensagens:string = '';
  @ViewChild('PecasComputador') PecasComputador:PecasComputadorComponent;

  constructor(private lojaService: LojaService,
              private router: Router) { }


  listarComputador(){
    this.lojaService.listarComputador()
                    .subscribe(lista => { this.computadores = lista;});
  }

  definirComputador(computador: Computador){
    this.listarComputador()
    this.ocutar_caixa_item = true;
    this.acao = 'atualizar';
    this.computador = computador;
    this.PecasComputador.selecionarPecasComComputador(this.computador);
  }

  registrarComputador(){
    var computador_id = this.estrairIdsComputador()
    this.mensagens = 'Carregando ...'
    if(this.acao == 'criar'){
      this.lojaService.registrarComputador(computador_id)
                      .subscribe(lista => { this.listarComputador();
                                            this.mensagens = ''},
                                 err => { this.mensagensDeErro(err) });
    }else if(this.acao == 'atualizar'){
      var id = this.computador['id'];
      this.lojaService.atualizarComputador(computador_id,id)
                      .subscribe(lista => { this.listarComputador();
                                            this.mensagens = ''},
                                 err => { this.mensagensDeErro(err) });
    }
  }

  mensagensDeErro(erro:object){
    console.log(erro)
    var erro_json = erro['_body'];
    let erro_obj = JSON.parse(erro_json);
    this.mensagens = erro_obj.non_field_errors[0]
    console.log(this.mensagens)
  }

  estrairIdsComputador():object{
    var computador_id:object = {};
    for(let pecas in this.computador){
      if(pecas != 'memoria_ram'){
        if(this.computador[pecas])
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
    return computador_id;
  }

  novoComputador(){
    this.ocutar_caixa_item = true;
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
    this.PecasComputador.selecionarPecasComComputador(this.computador);
  }

  ngOnInit(){
    this.novoComputador()
    this.listarComputador()
  }

}
