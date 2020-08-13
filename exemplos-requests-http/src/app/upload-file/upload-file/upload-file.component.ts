import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../upload-file.service';
import { environment } from 'src/environments/environment';
import { HttpEventType, HttpEvent } from '@angular/common/http';
import { uploadProgress, filterResponse } from 'src/app/shared/rxjs-customized-operators';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

	files : Set<File>
	progress: number = 0

  constructor(private uploadService : UploadFileService) { }

  ngOnInit(): void {
	}
	aoEscolher(evento){	
		console.log(evento)
		const selectedFiles = <FileList>evento.srcElement.files		

		const fileNames = []
		this.files = new Set()
		for (let i = 0; i< selectedFiles.length; i++){
			fileNames.push(selectedFiles[i].name)
			this.files.add(selectedFiles[i])
		}
		document.getElementById('customFileLabel')
			.innerHTML = `arquivos escolhidos: ${fileNames.join(' , ')}`
		this.progress = 0
	}

	onDownloadExcel(){
		this.uploadService.download(environment.BASE_URL + '/downloadExcel')
			.subscribe((res : any) => {
				this.uploadService.handleFile(res, 'report-download.xlsx')

			})
	}
	onDownloadPDF(){
		this.uploadService.download(environment.BASE_URL + '/downloadPDF')
			.subscribe((res : any) => {
				this.uploadService.handleFile(res, 'report-download.pdf')

			})
	}

	onUpload(){
		if (this.files && this.files.size > 0){
			this.uploadService.upload(this.files, environment.BASE_URL + '/upload')
		//usando o operator customizado criado
		.pipe(
			uploadProgress(progress => {
				console.log('uploadprogress', progress)
				this.progress = progress
			}),
			filterResponse()
		)
		.subscribe(resp => console.log('upload feito'))
			/* 	.subscribe((event: HttpEvent<Object>) => {
					//HttpEventType
					console.log(event)
					if (event.type === HttpEventType.Response){

						console.log('upload feito')
					}else if (event.type === HttpEventType.UploadProgress){
						const percentDone = Math.round(((event.loaded * 100)/ event.total))
						console.log('percentDone', percentDone)
						this.progress = percentDone
					}
				}) */
		}
		//precisa fazer o unsubscribe como feito c o ondestroy, por ex
	}

}
