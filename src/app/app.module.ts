import { FormularioService } from './formulario/formulario.service';
import { RegistroService } from './registro/registro.service';
import { LojaService } from './loja/loja.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { FormularioComponent } from './formulario/formulario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistroComponent } from './registro/registro.component';
import { CadastroComponent } from './registro/cadastro/cadastro.component';
import { LoginComponent } from './registro/login/login.component';
import { LojaComponent } from './loja/loja.component';
import { PecasComputadorComponent } from './loja/pecas-computador/pecas-computador.component';
import { ItemComputadorComponent } from './loja/item-computador/item-computador.component';
import { RouterModule } from '@angular/router';
import { ROTAS } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    FormularioComponent,
    RegistroComponent,
    CadastroComponent,
    LoginComponent,
    LojaComponent,
    PecasComputadorComponent,
    ItemComputadorComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(ROTAS)
  ],
  providers: [FormularioService,RegistroService,LojaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
