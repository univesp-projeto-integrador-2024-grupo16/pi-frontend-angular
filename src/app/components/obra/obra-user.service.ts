import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {TokenService} from "../../shared/session/token.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, shareReplay} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ObraUserService {

  constructor() { }

  #http: HttpClient = inject(HttpClient)
  #session: TokenService = inject(TokenService)
  #url:WritableSignal<string> = signal(environment.API_BASE+'obras_usuarios/')

  public getObraUser$(): Observable<any> {
    return this.#http.get(this.#url()).pipe(
      shareReplay()
    )
  }
}
