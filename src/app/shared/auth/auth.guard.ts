import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "./auth.service";
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const auth: AuthService = inject(AuthService)
  const router: Router = inject(Router)

  if(!auth.isAuthenticated()) {
    if (state['length'] != 0) {
      if (state[0].path != 'auth') {
        router.navigate(['','auth','login'])
      }
    }
    return false
  }else{
    if(state['length'] != 0){
      if (state[0].path == 'auth'){
        router.navigate([''])
      }
    }
    return true
  }

};
