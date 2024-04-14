import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {FornecedoresComponent} from "./fornecedores.component";


@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: FornecedoresComponent },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class FornecedoresRoutingModule { }
