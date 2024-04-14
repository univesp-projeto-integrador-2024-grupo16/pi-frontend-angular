import {Component, inject, OnInit} from '@angular/core';
import {FornecedoresService} from "./fornecedores.service";
import {Fornecedor} from "./fornecedor";
import {Qualificacao} from "./qualificacao";

@Component({
  selector: 'app-fornecedores',
  standalone: false,
  templateUrl: './fornecedores.component.html',
  styleUrl: './fornecedores.component.scss'
})
export class FornecedoresComponent implements OnInit{

  #fornecedores:FornecedoresService = inject(FornecedoresService)
  fornecedores:Fornecedor[] | undefined
  qualificacaos: Qualificacao[] | undefined

  ngOnInit(){
    this.#fornecedores.httGetFornecedores$().subscribe(
      (data) => {
        this.fornecedores = data[0].fornecedores
      }
    )
  }

  getAvaliacao(fornecedor: string){
    console.log(fornecedor)
    return this.#fornecedores.httpGetAvaliacao$(fornecedor).subscribe(
      {
        next: (data) => {
          console.log(data)
          if (data.length > 0){
            this.qualificacaos = data
          }else {
            this.qualificacaos = undefined
          }
          console.log(this.qualificacaos)

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
}
