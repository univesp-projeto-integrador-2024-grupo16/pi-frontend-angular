import {HttpRequest} from "@angular/common/http";

export function  addTokenHeader(request: HttpRequest<any>, token: string): HttpRequest<any>{

  return request.clone({headers: request.headers.set("Authorization", `Bearer ${token}`)})
}
