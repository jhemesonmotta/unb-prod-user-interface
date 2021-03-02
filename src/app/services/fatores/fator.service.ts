import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BACKEND_API_PRODUTIVIDADE } from '../backend.api';
import { ResponseMessage } from 'app/model/responseMessage';
import { Fator } from 'app/model/fator';

@Injectable()
export class FatorService {

  constructor(private http: HttpClient) {}

  buscarPorId(id: number):Observable<Fator> {
    return this.http.get(`${BACKEND_API_PRODUTIVIDADE}fator/${id}`) as Observable<Fator>;
  }

  listar():Observable<Array<Fator>> {
    return this.http.get(`${BACKEND_API_PRODUTIVIDADE}fator`) as Observable<Array<Fator>>;
  }

  criar(alocacao: Fator): Observable<ResponseMessage> {
    return this.http.post(`${BACKEND_API_PRODUTIVIDADE}fator`, alocacao) as Observable<ResponseMessage>;
  }

  atualizar(alocacao: Fator): Observable<ResponseMessage> {
    return this.http.put(`${BACKEND_API_PRODUTIVIDADE}fator`, alocacao) as Observable<ResponseMessage>;
  }
}
