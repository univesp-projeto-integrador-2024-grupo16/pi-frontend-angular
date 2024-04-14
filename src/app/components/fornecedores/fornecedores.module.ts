import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FornecedoresComponent} from "./fornecedores.component";
import {FornecedoresRoutingModule} from "./fornecedores-routing.module";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {TagModule} from "primeng/tag";
import {ToolbarModule} from "primeng/toolbar";
import {DynamicDialogModule} from "primeng/dynamicdialog";



@NgModule({
  declarations: [FornecedoresComponent],
  imports: [
    CommonModule,
    FornecedoresRoutingModule,
    TableModule,
    ButtonModule,
    RippleModule,
    TagModule,
    ToolbarModule,
    DynamicDialogModule
  ]
})
export class FornecedoresModule { }
