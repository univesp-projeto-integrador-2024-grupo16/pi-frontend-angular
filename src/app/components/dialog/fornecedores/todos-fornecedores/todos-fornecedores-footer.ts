import { Component } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import {Fornecedor} from "../../../fornecedores/fornecedor";

@Component({
  selector: 'footer',
  template:  `
        <div class="flex w-full justify-content-end mt-3">
            <p-button type="button" label="Cancel" icon="pi pi-times" (click)="closeDialog()"></p-button>
        </div> `
})
export class TodosFornecedoresFooter {


  constructor(public ref: DynamicDialogRef) {}

  closeDialog() {
    this.ref.close();
  }
}
