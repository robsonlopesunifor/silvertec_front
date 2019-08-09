import { Routes } from '@angular/router'

import { LoginComponent } from "./registro/login/login.component";
import { CadastroComponent } from "./registro/cadastro/cadastro.component";
import { LojaComponent } from "./loja/loja.component";

export const ROTAS: Routes = [

  	{path: 'login', component: LoginComponent },
  	{path: 'cadastro', component: CadastroComponent },
 	{path: 'loja', component: LojaComponent }

]