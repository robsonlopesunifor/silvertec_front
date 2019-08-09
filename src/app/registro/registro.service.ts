import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";			
import { Observable } from 'rxjs/Observable';		
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import {Headers} from '@angular/http'

@Injectable()
export class RegistroService {

  private _Url = 'https://silvertec-back.herokuapp.com/';

  constructor(private _http: Http){}

  listarUsuarios():Observable<object> 
  {	
      var url = this._Url+'person/';
      return this._http.get(url).map((response:Response) => <object>response.json());               
  }

  cadastrarCliente(username:string,email:string,password:string):Observable<object> 
  { 
      var url = this._Url+'cadastro/cadastrar/';
      var params = {'campo-nome-usuario':username, 
                    'campo-email':email,
                    'campo-senha':password}
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this._http.post(url, JSON.stringify(params),{headers}).map(res=> res.json());               
  }

  logarCliente(username:string,password:string):Observable<object> 
  { 
      var url = this._Url+'api-token-auth/';
      var params = {'username':username, 
                    'password':password}
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this._http.post(url, JSON.stringify(params),{headers}).map(res=> res.json());               
  }

  atualizarUsuarios(id:string,firstName:string,lastName:string):Observable<object> 
  {	
      var params = {'id':id, 'firstName':firstName, 'lastName':lastName,}
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
        
      return this._http.put(this._Url, JSON.stringify(params),{headers}).map(res=> res.json());
  }

}
