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
    placa_mae:[false,false,false,false,false,false],
    processador:[false,false,false,false,false,false],
    placa_video:[false,false,false,false,false,false],
    memoria_ram:[[false,0],[false,0],[false,0],[false,0],[false,0],[false,0]],
  }

  private pecasNome:string[] = ['placa_mae',
                                'processador',
                                'memoria_ram',
                                'placa_video']

  constructor(private lojaService: LojaService) { }

  imagemDaPeca(peca_nome:string,peca:object){
    return '/assets/'+peca_nome+'_peca_'+peca['id']+'.fw.png'
  }

  quantidadeDeMemoriaRam(memoria_ram:object):number{
    return this.pecaEscolhida['memoria_ram'][memoria_ram['id']][1]
  }

  definirPeca(tipo_peca:string,peca:object){
    if(this.computador){
      if(this.computador[tipo_peca] == peca)
        this.computador[tipo_peca] = {}
      else
        this.computador[tipo_peca] = peca;
      this.selecionarPecas()
    }
    console.log(this.pecaEscolhida)
  }

  selecionarPecasComComputador(computador:Computador){
    this.computador = computador;
    this.selecionarPecas();
  }

  selecionarPecas(){
    this.selecionarPecasDeacordoComputadorDefinido()
    this.selecionarMemoriaRamDeacordoComputadorDefinido()
  }

  selecionarPecasDeacordoComputadorDefinido(){
    for(let id_nome in this.pecasNome){
      var nome_da_peca = this.pecasNome[id_nome]
      var lista_pecas = this.pecas[nome_da_peca];
      for(let idx_peca in lista_pecas){
        var id_peca = lista_pecas[idx_peca]['id'];
        this.pecaEscolhida[nome_da_peca][id_peca] = false;
        if(nome_da_peca != 'memoria_ram' && this.computador[nome_da_peca]){
          if(id_peca == this.computador[nome_da_peca]['id'])
            this.pecaEscolhida[nome_da_peca][id_peca] = true;
        }
      }
    }
  }

  selecionarMemoriaRamDeacordoComputadorDefinido(){
      var lista_memoria_ram = this.pecas['memoria_ram'];
      for(let idx_peca in lista_memoria_ram){
        var id_peca = lista_memoria_ram[idx_peca]['id']
        this.pecaEscolhida['memoria_ram'][id_peca] = false;
        var lista_ram_selecionadas = this.computador['memoria_ram'];
        for(let idx_ram_selecionada in lista_ram_selecionadas){
          var id_ram_selecionada = lista_ram_selecionadas[idx_ram_selecionada][0]['id']
          var ram = lista_ram_selecionadas[idx_ram_selecionada];
          if(id_ram_selecionada == id_peca){
            this.pecaEscolhida['memoria_ram'][id_ram_selecionada] = []
            this.pecaEscolhida['memoria_ram'][id_ram_selecionada][0] = true;
            this.pecaEscolhida['memoria_ram'][id_ram_selecionada][1] = ram[1];
          }
        }
      }
  }

  // eu sei que o codigo esta sujo, foi por conta do tempo
  definirMemoriaRam(mais_ou_menos:string,peca:object){
      var tamanho = this.computador['memoria_ram'].length;
      if(tamanho > 0){
        var posicao = -1;
        for(var i = 0;i < tamanho;i++){
          if(this.computador['memoria_ram'][i][0]['id'] == peca['id'])
             posicao = i;
        }
        if(posicao != -1){
          if(mais_ou_menos == 'mais'){
            this.computador['memoria_ram'][posicao][1] += 1;
          }else{
            this.computador['memoria_ram'][posicao][1] -= 1;
            if(this.computador['memoria_ram'][posicao][1] == 0){
               this.computador['memoria_ram'].splice(posicao)
            }
          }
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
    this.selecionarPecas()
  }



  listarPecas(peca:string){
    this.lojaService.listarPecas(peca)
                    .subscribe(lista => { this.pecas[peca] = lista;});
  }
  

  ngOnInit() {
    this.listarPecas('placa_mae')
    this.listarPecas('processador')
    this.listarPecas('memoria_ram')
    this.listarPecas('placa_video')
  }

}
