import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BACKEND_API } from '../backend.api';
import { UsuarioLogado } from 'app/model/usuarioLogado';
import { Alocacao } from 'app/model/alocacao';

@Injectable()
export class AlocacaoService {

  constructor(private http: HttpClient) {}

  getAlocacaoByPessoaID(usuario: UsuarioLogado):Observable<Array<Alocacao>> {
    return this.http.get(`${BACKEND_API}/alocacao/pessoa/${usuario.id}`) as Observable<Array<Alocacao>>;
  }
}
