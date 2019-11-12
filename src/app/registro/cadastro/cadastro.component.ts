import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RegistroService } from '../registro.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  public token:object;
  public mensagem:string = ''; 

  @Output() add = new EventEmitter()

  profileForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });


  constructor(private registroService: RegistroService,
              private router: Router) { }

  cadastrar():void{
    this.mensagem = "Cadastrando ..."
    var username = this.profileForm.value['username'];
    var email = this.profileForm.value['email'];
    var password = this.profileForm.value['password'];
    this.registroService.cadastrarCliente(username,email,password)
                        .subscribe(confronto => {this.token = confronto;
                                                 this.add.emit(this.token['Token']);
                                                 this.router.navigate(['']);});
  
  }

  onSubmit() {
    //console.warn(this.profileForm.value['first_name']);
    //console.warn(this.listaUsuarios);
    this.cadastrar();
  }


  ngOnInit() {
    
  }

}
