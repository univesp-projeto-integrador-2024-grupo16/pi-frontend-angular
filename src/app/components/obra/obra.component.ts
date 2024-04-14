import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ObraUserService} from "./obra-user.service";
import { Subscription} from "rxjs";
import {Obra} from "./obra";
import {TokenService} from "../../shared/session/token.service";



@Component({
  selector: 'app-obra',
  standalone: false,
  templateUrl: './obra.component.html',
  styleUrl: './obra.component.scss'
})


export class ObraComponent implements OnInit, OnDestroy {

  #obra: ObraUserService = inject(ObraUserService)
  obras: Obra[] | undefined

  #session: TokenService = inject(TokenService)

  constructor() {

  }

  selectedObra: string | undefined;

  getObras(): Subscription {

    return this.#obra.getObraUser$().subscribe({
      next: (data) => {
        this.obras = data[0].obras
      },
      error: (error) => {
        console.error(error)
      }
    })
}


singOut() {
  this.#session.singOut()
}

sing(){

  if (this.selectedObra){

    this.#session.saveUserProject(this.selectedObra)
  }

}

  ngOnInit() {

    this.getObras()

  }

  ngOnDestroy() {
    this.getObras().unsubscribe()
  }

}
