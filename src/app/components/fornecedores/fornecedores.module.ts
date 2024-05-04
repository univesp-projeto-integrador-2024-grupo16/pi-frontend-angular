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
import {TodosFornecedoresComponent} from "../dialog/fornecedores/todos-fornecedores/todos-fornecedores.component";
import {TodosFornecedoresFooter} from "../dialog/fornecedores/todos-fornecedores/todos-fornecedores-footer";
import {AvaliacaoComponent} from "../dialog/avaliacao/avaliacao.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {DropdownModule} from "primeng/dropdown";
import {TooltipModule} from "primeng/tooltip";


@NgModule({
  declarations: [
    FornecedoresComponent,
    TodosFornecedoresComponent,
    TodosFornecedoresFooter,
    AvaliacaoComponent
  ],
  imports: [
    CommonModule,
    FornecedoresRoutingModule,
    TableModule,
    ButtonModule,
    RippleModule,
    TagModule,
    ToolbarModule,
    DynamicDialogModule,
    FormsModule,
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    TooltipModule


  ]
})
export class FornecedoresModule { }
