import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RegistroService } from '../registro.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  public token:object;

  @Output() add = new EventEmitter()

  profileForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  private mensagem:object; 

  constructor(private registroService: RegistroService) { }

  cadastrar():void{
    var username = this.profileForm.value['username'];
    var email = this.profileForm.value['email'];
    var password = this.profileForm.value['password'];
    console.log(username,password)
    this.registroService.cadastrarCliente(username,email,password)
                        .subscribe(confronto => {this.token = confronto;
                                                 this.add.emit(this.token['Token'])});
  
  }

  onSubmit() {
    //console.warn(this.profileForm.value['first_name']);
    //console.warn(this.listaUsuarios);
    this.cadastrar();
  }


  ngOnInit() {
  }

}
