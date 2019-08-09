import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Computador } from '../computador.model'
import { LojaService } from '../loja.service';


@Component({
  selector: 'app-pecas-computador',
  templateUrl: './pecas-computador.component.html',
  styleUrls: ['./pecas-computador.component.css']
})
export class PecasComputadorComponent implements OnInit {

  @Input() computador: Computador;
  public pecas:object = {
    placa_mae:[],
    processador:[],
    memoria_ram:[],
    placa_video:[],
  }

  private pecaEscolhida:object = {
    processador:[true,false,true,false,true,false],
    placa_mae:[true,false,true,false,true,false],
    memoria_ram:[true,false,true,false,true,false],
    placa_video:[true,false,true,false,true,false],
  }

  private pecasNome:string[] = ['placa_mae',
                                'processador',
                                'memoria_ram',
                                'placa_video']

  constructor(private lojaService: LojaService) { }

  definirPeca(tipo_peca:string,peca:object){
    this.computador[tipo_peca] = peca;
    this.selecionarPecas()
    console.log(this.computador)
  }

  selecionarPecas(){
    for(let nome in this.pecasNome){
      var tamanho = this.pecas[this.pecasNome[nome]].length;
      for(var i = 0;i <= tamanho;i++){
        this.pecaEscolhida[this.pecasNome[nome]][i] = false;
        if(this.pecasNome[nome] != 'memoria_ram'){
          if(i == this.computador[this.pecasNome[nome]]['id'])
            this.pecaEscolhida[this.pecasNome[nome]][i] = true;
        }else{
          var tamanho_ram = this.computador[this.pecasNome[nome]].length;
          console.log(tamanho_ram)
          for(var j = 0;j < tamanho_ram;j++){
            if(i == this.computador[this.pecasNome[nome]][j][0]['id'])
              this.pecaEscolhida[this.pecasNome[nome]][i] = true;
          }
        }
      }
    }
    console.log(this.pecaEscolhida)
  }

  definirMemoriaRam(mais_ou_menos:string,peca:object){

    if(mais_ou_menos == 'mais'){
      var tamanho = this.computador['memoria_ram'].length;
      console.log(tamanho)
      console.log(peca)
      if(tamanho > 0){
        var posicao = -1;
        for(var i = 0;i < tamanho;i++){
          if(this.computador['memoria_ram'][i][0]['id'] == peca['id'])
             posicao = i;
        }
        if(posicao != -1){
          this.computador['memoria_ram'][posicao][1] += 1;
        }else{
          this.computador['memoria_ram'][tamanho] = []
          this.computador['memoria_ram'][tamanho][0] = peca
          this.computador['memoria_ram'][tamanho][1] = 1
        }
      }else{
        this.computador['memoria_ram'] = []   
        this.computador['memoria_ram'][0] = []
        this.computador['memoria_ram'][0][0] = peca
        this.computador['memoria_ram'][0][1] = 1
      }
    }
    this.selecionarPecas()
  }

  listarPecas(peca:string){
    this.lojaService.listarPecas(peca)
                    .subscribe(lista => { this.pecas[peca] = lista;
                                          console.log(this.pecas[peca])});
  }
  

  ngOnInit() {
    this.listarPecas('placa_mae')
    this.listarPecas('processador')
    this.listarPecas('memoria_ram')
    this.listarPecas('placa_video')
  }

}
