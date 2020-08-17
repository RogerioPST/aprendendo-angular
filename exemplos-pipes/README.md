# Exemplos de Pipes com Angular
- [x] - Anotações
- [ ] - [olhar as anotações sobre <b>MÓDULOS</b> na pasta modulos](https://github.com/RogerioPST/aprendendo-angular/blob/master/meu-primeiro-projeto/modulos/README.MD)
- [ ] - [olhar as anotações sobre <b>ng-content</b> para passar componentes para outros componentes](https://github.com/RogerioPST/aprendendo-angular/blob/master/exemplo-diretivas/ng-content/README.MD)

## Anotações:
<ol>
<li>Informações sobre os Pipes (|):
<ul>
<li>são os filtros, ou seja, transformam um valor mostrado dentro do template</li>
<li>são aplicados na mesma ordem em que são colocados no código</li>
<li>implementam o metodo transform da interface PipeTransform</li>
<li>os parametros são colocados após os ':' (dois pontos): nomePipe:parametro1:parametro2</li>
</ul>
</li>

<li>
PIPES CUSTOMIZADOS:
<ul>
<li>

```javascript

//camel-case.pipe.ts
@Pipe({name: 'meupipeCamelCase'})
export class CamelCasePipe implements PipeTransform {
transform(value: any, ...args: unknown[]): unknown {
let values = value.split(' ')
let result = ''
for (let v of values){result += this.capitalize(v) + ' '}
return result;}
capitalize(value: string){
return value.substr(0,1).toUpperCase() + value.substr(1).toLowerCase()}}

//html
<p>Titulo: {{livro.titulo | uppercase | lowercase | meupipeCamelCase}}</p>
```
</li>

</ul>
</li>

<li>aplicando INTERNACIONALIZAÇÃO / LOCALE p <b>'pt-BR'</b> na app
<ul>
<li>usar o locale a seguir junto com o providers abaixo: registerLocaleData(br, 'pt-BR');
</li>
<li>1ª forma: providers: [ {
provide: LOCALE_ID,
useValue: 'pt-BR'
},]</li> 
<li>2ª forma: providers: [MeusSettingsService,
{
provide: LOCALE_ID,
deps: [MeusSettingsService],
useFactory: (settingsService) => settingsService.getLocale()
}]</li> 
</ul>

```javascript
//app.module.ts
registerLocaleData(br, 'pt-BR');
//usar o locale acima junto com o providers abaixo
@NgModule({
declarations: [AppComponent,ExemplosPipesComponent,CamelCasePipe,
FiltroArrayPipe,FiltroArrayImpuroPipe],
imports: [BrowserModule,AppRoutingModule,FormsModule],
providers: [ {
provide: LOCALE_ID,
useValue: 'pt-BR'
},  /* MeusSettingsService,
{
provide: LOCALE_ID,
deps: [MeusSettingsService],
useFactory: (settingsService) => settingsService.getLocale()
} */],
bootstrap: [AppComponent]})
export class AppModule { }

//MeusSettingsService
export class MeusSettingsService {
constructor() { }
getLocale(){return 'pt-BR'}}
```
</li>
</ol>
