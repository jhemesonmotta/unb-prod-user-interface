import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BACKEND_API } from '../backend.api';
import { UsuarioLogado } from 'app/model/usuarioLogado';
import { Alocacao } from 'app/model/alocacao';
import { RequestCriarAlocacao } from 'app/model/requestCriarAlocacao';
import { ResponseMessage } from 'app/model/responseMessage';

@Injectable()
export class AlocacaoService {

  constructor(private http: HttpClient) {}

  getAlocacaoByUsuarioLogado(usuario: UsuarioLogado): Observable<Array<Alocacao>> {
    return this.http.get(`${BACKEND_API}alocacao/pessoa/${usuario.pessoa.id}`) as Observable<Array<Alocacao>>;
  }

  criar(alocacao: RequestCriarAlocacao): Observable<ResponseMessage> {
    return this.http.post(`${BACKEND_API}alocacao`, alocacao) as Observable<ResponseMessage>;
  }
}