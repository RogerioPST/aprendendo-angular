import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CursosModule } from './cursos/cursos.module';

//todos os modules, td q estiver dentro de imports pode ser
//usado dentro de qualquer um dos elementos dentro de declarations!
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
		AppRoutingModule,
		CursosModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
