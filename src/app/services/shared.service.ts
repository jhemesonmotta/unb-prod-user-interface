import {EventEmitter, Injectable} from '@angular/core';
import {UsuarioLogado} from '../model/usuarioLogado';

@Injectable()
export class SharedService {

  public static instance: SharedService = null;
  showTemplate = new EventEmitter<boolean>();

  constructor() {
    return SharedService.instance = SharedService.instance || this;
  }

  storeLogin(userAuthentication: UsuarioLogado): void {
    localStorage.setItem('currentUser', JSON.stringify({authenticationPair: userAuthentication}));
  }

  logOut() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = './login';
  }

  private getUserLoggedIn(): any {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  getCurrentLogin(): UsuarioLogado | null {
    const userLoggedIn = this.getUserLoggedIn();
    if(userLoggedIn != null){
      return userLoggedIn.authenticationPair;
    }
    return null;
  }

  isLoggedIn(): boolean {
    let authenticationObject = this.getUserLoggedIn();
    if (authenticationObject == null) {
      return false;
    } else {
      let authenticationPair: UsuarioLogado = authenticationObject.authenticationPair;
      if (authenticationPair == null ||
        authenticationPair.id == null ||
        authenticationPair.pessoa == null ||
        authenticationPair.pessoa.id == null) {
        return false;
      }
    }
    return true;
  }

}
