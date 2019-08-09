import { FormularioService } from './formulario.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})


export class FormularioComponent implements OnInit {

  profileForm = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
  });

  listaUsuarios:object = [
    {first_name:'robson', last_name:'lopes'},
    {first_name:'paulo', last_name:'pedro'},
    {first_name:'pedro', last_name:'lucas'}
  ]

  private mensagem:object; 

  constructor(private formularioService: FormularioService) { }

  listar():void{
    this.formularioService.listarUsuarios()
                          .subscribe(lista => this.listaUsuarios = lista);
  }

  registrar():void{
    var firstName = this.profileForm.value['first_name'];
    var lastName = this.profileForm.value['last_name'];
    this.formularioService.registrarUsuarios(firstName,lastName)
                      .subscribe(confronto => {this.profileForm.patchValue(confronto);
                                               this.listar()});
  }

  atualizar():void{
    var id = 'id';
    var firstName = this.profileForm.value['first_name'];
    var lastName = this.profileForm.value['last_name'];
    this.formularioService.atualizarUsuarios(id,firstName,lastName)
                          .subscribe(confronto => this.listaUsuarios = confronto);
  }

  deletar(id:string):void{
    this.formularioService.deletaUsuarios(id)
                          .subscribe(mensagem => {console.warn(mensagem);
                                                  this.listar()});
  }

  onSubmit() {
    //console.warn(this.profileForm.value['first_name']);
    //console.warn(this.listaUsuarios);
    this.registrar();
  }

  listarUsuarios(){
    this.listaUsuarios = [
      {first_name:'joao', last_name:'marquis'},
      {first_name:'paulo', last_name:'pedro'}
    ]
  }

  updateProfile() {
    this.profileForm.patchValue({
      first_name: 'Nancy',
      last_name: 'Nancy',
    });
  }

  ngOnInit() {
  }

}
