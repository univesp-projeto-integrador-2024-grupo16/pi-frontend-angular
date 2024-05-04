import {HttpRequest} from "@angular/common/http";

export function  addTokenHeader(request: HttpRequest<any>, token: string): HttpRequest<any>{

  let req_1 = request.clone({headers: request.headers.set("Authorization", `Bearer ${token}`)})
  let req_2 = req_1.clone({headers: req_1.headers.set("Content-Type", "application/json")})

  return req_2
}
