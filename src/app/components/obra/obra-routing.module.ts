import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {ObraComponent} from "./obra.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ObraComponent },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class ObraRoutingModule { }
