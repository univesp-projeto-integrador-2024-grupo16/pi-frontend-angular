import { CanMatchFn } from '@angular/router';
import {inject} from "@angular/core";
import {TokenService} from "./token.service";

export const obraGuard: CanMatchFn = (route, segments) => {
  const session: TokenService = inject(TokenService)

  if (session.getUserProject() != null) {
    return true;
  }
  return false;
};
