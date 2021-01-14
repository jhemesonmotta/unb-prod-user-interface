import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BACKEND_API } from '../backend.api';
import { RequestLogin } from 'app/model/requestLogin';
import { UsuarioLogado } from 'app/model/usuarioLogado';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {}

  login(usuario: RequestLogin):Observable<UsuarioLogado> {
    return this.http.post(`${BACKEND_API}usuario/login`, usuario) as Observable<UsuarioLogado>;
  }

  listar():Observable<Array<UsuarioLogado>> {
    return this.http.get(`${BACKEND_API}usuario`) as Observable<Array<UsuarioLogado>>;
  }
}
