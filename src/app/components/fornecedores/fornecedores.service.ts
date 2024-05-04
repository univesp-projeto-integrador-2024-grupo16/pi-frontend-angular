import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from "@angular/common/http";

import {TokenService} from "../../shared/session/token.service";
import {environment} from "../../../environments/environment";
import {Observable, shareReplay} from "rxjs";
import {Avaliacao, AvaliacaoPost} from "../dialog/avaliacao/IAvaliacao";

@Injectable({
  providedIn: 'root'
})
export class FornecedoresService {

  #http: HttpClient = inject(HttpClient)
  #session: TokenService = inject(TokenService)

  #url:WritableSignal<string> = signal(environment.API_BASE+'fornecedor_obras/')
  #url_qualificacao:WritableSignal<string> = signal(environment.API_BASE+'qualificacao/')
  #url_all_fornecedores:WritableSignal<string> = signal(environment.API_BASE+'fornecedor/')
  constructor() { }

  public httpGetAllFornecedores$(): Observable<any> {
    return this.#http.get(this.#url_all_fornecedores()).pipe(
      shareReplay()
    )
  }

  public httpGetFornecedor$(fornecedor: string): Observable<any> {
    return this.#http.get(this.#url_all_fornecedores()+fornecedor+"/").pipe(
      shareReplay()
    )

  }

  public httpGetTipoFornecimento$(): Observable<any> {
    return this.#http.get(environment.API_BASE+'tipo_fornecimento/').pipe(
      shareReplay()
    )
  }


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

  public httpPostFornecedoresObra$(fornecedor: any): Observable<any>{
    return this.#http.post(this.#url(), {fornecedores:fornecedor, obra: this.#session.getUserProject()}).pipe(
      shareReplay()
    )
  }

  public httGetAvaliacaoUnique$(avaliacao:string): Observable<any> {
    return this.#http.get(this.#url_qualificacao()+avaliacao+"/").pipe(
      shareReplay()
    )
  }

  public httpPostAvaliacao$(avaliacao: AvaliacaoPost): Observable<any>{

    return this.#http.post(this.#url_qualificacao(), avaliacao).pipe(
      shareReplay()
    )
  }

}
