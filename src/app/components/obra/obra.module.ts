import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ObraRoutingModule} from "./obra-routing.module";
import { DropdownModule } from 'primeng/dropdown';
import {ObraComponent} from "./obra.component";
import {FormsModule} from "@angular/forms";
import { ButtonModule } from 'primeng/button';
import { RippleModule}   from "primeng/ripple";


@NgModule({
  imports: [
    CommonModule,
    ObraRoutingModule,
    DropdownModule,
    FormsModule,
    ButtonModule,
    RippleModule
  ],
  declarations: [
    ObraComponent
  ]
})
export class ObraModule { }
