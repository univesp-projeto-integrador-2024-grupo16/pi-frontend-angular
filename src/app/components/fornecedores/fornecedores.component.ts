import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FornecedoresService} from "./fornecedores.service";
import {Fornecedor} from "./fornecedor";
import {Qualificacao} from "./qualificacao";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {TodosFornecedoresComponent} from "../dialog/fornecedores/todos-fornecedores/todos-fornecedores.component";
import {TodosFornecedoresFooter} from "../dialog/fornecedores/todos-fornecedores/todos-fornecedores-footer";
import {AvaliacaoComponent} from "../dialog/avaliacao/avaliacao.component";

@Component({
  selector: 'app-fornecedores',
  standalone: false,
  templateUrl: './fornecedores.component.html',
  styleUrl: './fornecedores.component.scss',
  providers: [DialogService]
})
export class FornecedoresComponent implements OnInit, OnDestroy{

  #fornecedores:FornecedoresService = inject(FornecedoresService)
  fornecedores:Fornecedor[] | undefined
  qualificacaos: Qualificacao[] | undefined

  constructor(public dialogService: DialogService) {
  }

  ref: DynamicDialogRef | undefined;
  refAvaliacao: DynamicDialogRef | undefined;

  ngOnInit(){
    this.getFornecedores()
  }

  getFornecedores(){
    this.#fornecedores.httGetFornecedores$().subscribe(
      (data) => {
        this.fornecedores = data[0].fornecedores
      }
    )
  }

  getAvaliacao(fornecedor: string){
    //console.log(fornecedor)
    //this.destroyAvaliation()
    return this.#fornecedores.httpGetAvaliacao$(fornecedor).subscribe(
      {
        next: (data) => {
          //console.log(data)
          if (data.length > 0){
            this.qualificacaos = data
          }else {
            this.qualificacaos = undefined
          }
          //console.log(this.qualificacaos)

        },
        error: (error) => {
          console.log(error)
        }
      }

    )
  }

  destroyAvaliation(){
    this.getAvaliacao('').unsubscribe()
  }

  getStatusSeverity(mean: number) {
    if(mean >= 6){
      return 'success';
    }else if(mean <6 && mean >= 4){
      return 'warning';
    }else{
      return 'danger';
    }

  }


  showAvaliacao(fornecedor: string, avaliacao: string | undefined){

    this.refAvaliacao = this.dialogService.open(AvaliacaoComponent,{
      header: 'Avaliação',
      width: '90vw',
      height: '90vh',
      contentStyle: {overflow: "auto"},
      baseZIndex: 10000,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
      data:{
        fornecedor: fornecedor,
        avaliacao: avaliacao,
      }
    })

    this.refAvaliacao.onClose.subscribe(
      {
        next: (value) => {
          this.getFornecedores()
          this.getAvaliacao(value)
        }
      }
   )
  }

  showDialog(){
    this.ref = this.dialogService.open(TodosFornecedoresComponent,{
      header: 'Fornecedores',
      width: '90vw',
      contentStyle: {overflow: "auto"},
      baseZIndex: 10000,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
      templates: {
        footer: TodosFornecedoresFooter
      }
    })

    this.ref.onClose.subscribe(
      {
        next: () => {
          this.getFornecedores()
        }
      }
    )
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
    if (this.refAvaliacao){
      this.refAvaliacao.close()
    }
    this.destroyAvaliation()
  }
}
