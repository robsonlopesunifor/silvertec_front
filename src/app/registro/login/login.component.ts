import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RegistroService } from '../registro.service';
import { FormGroup, FormControl } from '@angular/forms';
import { LojaService } from '../../loja/loja.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public token:object;
  private mensagem:object; 
  

  profileForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  
  constructor(private registroService: RegistroService,
              private lojaService: LojaService,
              private router: Router) { }

  logar():void{
    var username = this.profileForm.value['username'];
    var password = this.profileForm.value['password'];
    this.registroService.logarCliente(username,password)
                        .subscribe(token => {this.lojaService.registrarToken(token['token']);
                                             this.router.navigate(['/loja']);}); 
  }

  onSubmit() {
    //console.warn(this.profileForm.value['first_name']);
    //console.warn(this.listaUsuarios);
    this.logar();
  }


  ngOnInit() {
  }

}
