import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TokenService} from "../../shared/session/token.service";
import {environment} from "../../../environments/environment";
import {Observable, shareReplay} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FornecedoresService {

  #http: HttpClient = inject(HttpClient)
  #session: TokenService = inject(TokenService)
  #url:WritableSignal<string> = signal(environment.API_BASE+'fornecedor_obras/')
  #url_qualificacao:WritableSignal<string> = signal(environment.API_BASE+'qualificacao/')

  constructor() { }

  public httGetFornecedores$(): Observable<any> {
    return this.#http.get(this.#url(), {params:{obra: this.#session.getUserProject()}}).pipe(
      shareReplay()
    )
  }

  public httpGetAvaliacao$(fornecedor: string):Observable<any>{
    return this.#http.get(this.#url_qualificacao(), {params:{obra: this.#session.getUserProject(), fornecedor: fornecedor}}).pipe(
      shareReplay()
    )
  }

}
