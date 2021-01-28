import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BACKEND_API_USUARIOS } from '../backend.api';
import { UsuarioLogado } from 'app/model/usuarioLogado';
import { Alocacao } from 'app/model/alocacao';
import { RequestCriarAlocacao } from 'app/model/requestCriarAlocacao';
import { ResponseMessage } from 'app/model/responseMessage';
import { Empresa } from 'app/model/empresa';

@Injectable()
export class AlocacaoService {

  constructor(private http: HttpClient) {}

  getAlocacaoByEmpresa(empresa: Empresa): Observable<Array<Alocacao>> {
    return this.http.get(`${BACKEND_API_USUARIOS}alocacao/empresa/${empresa.id}`) as Observable<Array<Alocacao>>;
  }

  getAlocacaoByUsuarioLogado(usuario: UsuarioLogado): Observable<Array<Alocacao>> {
    return this.http.get(`${BACKEND_API_USUARIOS}alocacao/pessoa/${usuario.pessoa.id}`) as Observable<Array<Alocacao>>;
  }

  criar(alocacao: RequestCriarAlocacao): Observable<ResponseMessage> {
    return this.http.post(`${BACKEND_API_USUARIOS}alocacao`, alocacao) as Observable<ResponseMessage>;
  }
}
