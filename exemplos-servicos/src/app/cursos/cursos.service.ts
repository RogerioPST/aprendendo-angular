import { Injectable ,  EventEmitter} from '@angular/core';
import { LogService } from '../meus-servicos/log.service';


@Injectable()
export class CursosService{
//utilizando o EventEmitter, consigo passar info de um componente
//p outro
	emitirCursoCriado = new EventEmitter<string>()
	//utilizando o EventEmitter, consigo passar info de um componente
	//p outro, mesmo qdo n estou usando a mesma instancia. para isso, 
	//uso o static, pois o valor dessa variavel sera compartilhado
	//entre as instancias de CursosService
	static criouNovoCurso = new EventEmitter<string>()

	cursos: string [] = ['Angular', 'Java', 'CSS']
	getCursos(){
		this._logService.consoleLog('obtendo lista de cursos')
		return this.cursos
	}
	constructor(private _logService: LogService){
		console.log('chamando construtor do CursosService')
	}

	addCurso(curso: string){
		this.cursos.push(curso)
//msm tendo duas instancias de CursosService, c o codigo abaixo, faço a segunda instancia receber as info de cursos criados
		this.emitirCursoCriado.emit(curso)
		CursosService.criouNovoCurso.emit(curso)
	}

}