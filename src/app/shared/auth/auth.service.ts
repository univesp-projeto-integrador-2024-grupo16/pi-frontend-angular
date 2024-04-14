import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {TokenService} from "../session/token.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {environment} from "../../../environments/environment";
import {catchError, Observable, throwError} from "rxjs";
import {map} from "rxjs/operators";

interface tokens {
    access: 'string',
    refresh: 'string'
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  #http: HttpClient = inject(HttpClient)
  #router: Router = inject(Router)
  #session: TokenService = inject(TokenService)
  #jwtHelper: JwtHelperService = new JwtHelperService()
  #url: WritableSignal<string> = signal(environment.API_LOGIN)

  public sign$(username: string, password: string): Observable<any> {
    return this.#http.post(this.#url(), {"username": username, "password": password}).pipe(
      map((res: tokens) => {
        this.#session.saveAccessToken(res.access)
        this.#session.saveRefreshToken(res.refresh)
        this.refreshToken()
        this.#router.navigateByUrl('')
        return res
      }),
      catchError((err) => {
        if (err) return throwError(() => err)
        return throwError(() => 'Nao foi possivel realizar o login')
      })
    )
  }

  public refreshAccessToken$(token: string): Observable<any> {
    return this.#http.post<any>(`${this.#url()}/refresh`, {"refresh": token}).pipe(
      map((res: tokens) => {
        this.#session.saveAccessToken(res.access)
        this.refreshToken()
        return res
      }),
      catchError((err) => {
        if (err.error.message) return throwError(() => err.error.message)

        return throwError(() => 'Nao foi possivel realizar o login')
      })
    )
  }

  private refreshTokenTimeout?: number

  public refreshToken(): void {
    if (this.refreshTokenTimeout) {
      clearTimeout(this.refreshTokenTimeout)
    }
    const token = this.#session.getRefreshToken()
    if (token) {
      const tokenExp = this.#jwtHelper.getTokenExpirationDate(token)
      const now = new Date()
      const diff = tokenExp ? tokenExp.getTime() - now.getTime() : 0
      this.refreshTokenTimeout = window.setTimeout(() => {
        this.refreshAccessToken$(token).subscribe()
      }, diff - 1000)
    }
  }

  private stopRefreshTokenTimer(){
    clearTimeout(this.refreshTokenTimeout)
  }

  public isAuthenticated(): boolean {
    let logged: boolean = false
    if (!this.#session.getAccessToken() || !this.#session.getRefreshToken()) {
      return logged
    }
    if (this.#jwtHelper.isTokenExpired(this.#session.getAccessToken())) {
      this.stopRefreshTokenTimer()
      this.#router.navigateByUrl('')
      return logged
    }
    this.refreshToken()
    return !logged
  }

}
