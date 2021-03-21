import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BACKEND_API_USUARIOS } from '../backend.api';
import { RequestLogin } from 'app/model/requestLogin';
import { UsuarioLogado } from 'app/model/usuarioLogado';
import { RequestCriarUsuario } from 'app/model/requestCriarUsuario';
import { ResponseMessage } from 'app/model/responseMessage';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {}

  criar(requestCriarUsuario: RequestCriarUsuario): Observable<ResponseMessage> {
    return this.http.post(`${BACKEND_API_USUARIOS}usuario`, requestCriarUsuario) as Observable<ResponseMessage>;
  }

  login(usuario: RequestLogin):Observable<UsuarioLogado> {
    return this.http.post(`${BACKEND_API_USUARIOS}usuario/login`, usuario) as Observable<UsuarioLogado>;
  }

  listar():Observable<Array<UsuarioLogado>> {
    return this.http.get(`${BACKEND_API_USUARIOS}usuario`) as Observable<Array<UsuarioLogado>>;
  }

}
