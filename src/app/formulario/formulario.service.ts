import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";			
import { Observable } from 'rxjs/Observable';		
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import {Headers} from '@angular/http'

@Injectable()
export class FormularioService {

  private _Url = 'http://silvertec-back.herokuapp.com/';

  constructor(private _http: Http){}

  listarUsuarios():Observable<object> 
  {	
      var url = this._Url+'person/';
      return this._http.get(url).map((response:Response) => <object>response.json());               
  }

  registrarUsuarios(firstName:string,lastName:string):Observable<object> 
  {	
      var url = this._Url+'person/';
      var params = {'first_name':firstName, 'last_name':lastName,}
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

  deletaUsuarios(id:string){
      const url = `${this._Url}person/${id}/`; 
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this._http.delete(url,{headers});
  }

}
