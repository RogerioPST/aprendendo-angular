import { Component,  Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const INPUT_FIELD_VALUE_ACCESSOR: any ={
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => InputFieldComponent),
	multi: true
}

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
	styleUrls: ['./input-field.component.css'],
	providers: [INPUT_FIELD_VALUE_ACCESSOR]
})
//Curso Angular #114: Formulários reativos: Campo input customizado
export class InputFieldComponent implements ControlValueAccessor {
//	@Input() classeCss;
	@Input() id: string;
	@Input() label: string;
	@Input() type = 'text';
	@Input() control;
	@Input() isReadOnly = false;

	private innerValue: any

	get value(){
		return this.innerValue
	}

	set value(v: any){
		if (v !== this.innerValue){
			this.innerValue = v
			//informar q o valor foi modificado
			this.onChangeCallback(v)

		}
	}		

	constructor() { }

	onChangeCallback: (_: any) => void = () =>{}
	onTouchedCallback: (_: any) => void = () =>{}

	
//eh q vai ajudar a entender qual o valor desse campo de input
writeValue(v: any): void {
//vai chamar o "set value" acima	
	this.value = v;
}


registerOnChange(fn: any): void {
	//vai receber a funcao q o angular passar p a gente depois
	this.onChangeCallback = fn;
}

registerOnTouched(fn: any): void {
	//vai receber a funcao q o angular passar p a gente depois
	this.onTouchedCallback = fn;
}

setDisabledState?(isDisabled: boolean): void {
	this.isReadOnly = isDisabled;
}

  ngOnInit(): void {
  }

}
