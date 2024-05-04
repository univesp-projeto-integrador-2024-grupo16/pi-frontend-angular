import {Component, OnInit} from '@angular/core';
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {Fornecedor} from "../../../fornecedores/fornecedor";
import {FornecedoresService} from "../../../fornecedores/fornecedores.service";

@Component({
  selector: 'app-todos-fornecedores',
  standalone: false,
  templateUrl: './todos-fornecedores.component.html',
  styleUrl: './todos-fornecedores.component.scss',
  providers: [DialogService]
})
export class TodosFornecedoresComponent implements OnInit{

  constructor(private dialogService: DialogService, private ref: DynamicDialogRef, private fornecedores: FornecedoresService) {
  }

  fornecedor: Fornecedor[] | undefined;

  selectedFornecedores!: Fornecedor;

  ngOnInit() {
    this.fornecedores.httpGetAllFornecedores$().subscribe(
      {
        next: (data) => {
          this.fornecedor = data
        },
        error: (error) => {
          console.log(error)
        }
      }
    )
  }

  save(){
    this.fornecedores.httpPostFornecedoresObra$(this.selectedFornecedores).subscribe(
      {
        next: (data) => {
          console.log(data)
        },
        error: (error) => {
          console.log(error)
        },
        complete: () => {
          this.closeDialog()
        }

      }
    )
    console.log(this.selectedFornecedores)
  }

  closeDialog(){
    this.ref.close()
  }

}
