import {HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {inject} from "@angular/core";
import {TokenService} from "./session/token.service";
import {shareReplay} from "rxjs";
import {addTokenHeader} from "./utils/httpFunctions";

export const httpInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {

  const sessionStorage: TokenService = inject(TokenService)
  const token:string = sessionStorage.getAccessToken()
  //console.log(req)
  return next(addTokenHeader(req, token)).pipe(
    shareReplay()
  );
};
