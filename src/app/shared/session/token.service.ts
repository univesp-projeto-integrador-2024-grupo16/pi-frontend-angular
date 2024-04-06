import { Injectable } from '@angular/core';

const REFRESH_TOKEN_KEY: string = 'refresh'
const ACCESS_TOKEN_KEY: string = 'access'
const USER_PROJECT_KEY: string = 'project'

@Injectable({
  providedIn: 'root'
})
export class TokenService {

    constructor() { }

    public singOut(): void {
        window.sessionStorage.clear()
    }

    public saveAccessToken(token: string): void {
        window.sessionStorage.removeItem(ACCESS_TOKEN_KEY)
        window.sessionStorage.setItem(ACCESS_TOKEN_KEY, token)
    }

    public getAccessToken(): string | null {
        return window.sessionStorage.getItem(ACCESS_TOKEN_KEY)
    }

    public saveRefreshToken(token: string): void {
        window.sessionStorage.removeItem(REFRESH_TOKEN_KEY)
        window.sessionStorage.setItem(REFRESH_TOKEN_KEY, token)
    }

    public getRefreshToken(): string | null {
        return window.sessionStorage.getItem(REFRESH_TOKEN_KEY)
    }
}
