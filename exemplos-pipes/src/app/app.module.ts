import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExemplosPipesComponent } from './exemplos-pipes/exemplos-pipes.component';
import { CamelCasePipe } from './meus-pipes/camel-case.pipe';
import {registerLocaleData} from '@angular/common';
import br from '@angular/common/locales/pt';
import { MeusSettingsService } from './meus-settings.service';
import { FiltroArrayPipe } from './meus-pipes/filtro-array.pipe';
import { FiltroArrayImpuroPipe } from './meus-pipes/filtro-array-impuro.pipe';
registerLocaleData(br, 'pt-BR');
//usar o locale acima junto com o providers abaixo

@NgModule({
  declarations: [
    AppComponent,
    ExemplosPipesComponent,
    CamelCasePipe,
    FiltroArrayPipe,
    FiltroArrayImpuroPipe
  ],
  imports: [
    BrowserModule,
		AppRoutingModule,
		FormsModule
  ],
  providers: [ /* {
		provide: LOCALE_ID,
		useValue: 'pt-BR'
	},  */ MeusSettingsService,
	{
		provide: LOCALE_ID,
		deps: [MeusSettingsService],
		useFactory: (settingsService) => settingsService.getLocale()
	}
		
	],
  bootstrap: [AppComponent]
})
export class AppModule { }
