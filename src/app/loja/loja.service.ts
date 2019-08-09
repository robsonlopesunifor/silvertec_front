import { Computador } from './computador.model';
import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";			
import { Observable } from 'rxjs/Observable';		
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Headers } from '@angular/http'

@Injectable()
export class LojaService {

  private _Url = 'http://localhost:8000/'; //'https://silvertec-back.herokuapp.com/';
  private token:string = '' //'31d06f5d9cd8253554be462397aab438f9d102ca';

  registrarToken(token:string)
  {	
    this.token = token;
  }

  constructor(private _http: Http){}

  listarComputador():Observable<object> 
  {	
      var url = this._Url+'computador/';
      var _token = 'Token  '+this.token;
      const headers = new Headers();
      headers.append('Authorization', _token);
      return this._http.get(url,{headers}).map((response:Response) => <object>response.json());               
  }

  listarPecas(peca:string):Observable<object> 
  {
      var url = this._Url+peca;
      return this._http.get(url).map((response:Response) => <object>response.json());               
  }

  registrarComputador(computador:object):Observable<object> 
  { 
      var url = this._Url+'computador/';
      var _token = 'Token  '+this.token;
      const headers = new Headers();
      headers.append('Authorization', _token);
      headers.append('Content-Type', 'application/json');
      return this._http.post(url, JSON.stringify(computador),{headers}).map(res=> res.json());               
  }

}
