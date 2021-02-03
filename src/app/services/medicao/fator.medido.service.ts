import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BACKEND_API_PRODUTIVIDADE } from '../backend.api';
import { ResponseMessage } from 'app/model/responseMessage';
import { FatorMedido } from 'app/model/fatorMedido';

@Injectable()
export class FatorMedidoService {

  constructor(private http: HttpClient) {}

  buscarPorId(id: number):Observable<FatorMedido> {
    return this.http.get(`${BACKEND_API_PRODUTIVIDADE}fator/pessoa/${id}`) as Observable<FatorMedido>;
  }

  listar():Observable<Array<FatorMedido>> {
    return this.http.get(`${BACKEND_API_PRODUTIVIDADE}fator/pessoa`) as Observable<Array<FatorMedido>>;
  }

  listarPorMedicao(idMedicao: number):Observable<Array<FatorMedido>> {
    return this.http.get(`${BACKEND_API_PRODUTIVIDADE}fator/pessoa/medicao/${idMedicao}`) as Observable<Array<FatorMedido>>;
  }

  criar(fatorMedido: FatorMedido): Observable<ResponseMessage> {
    return this.http.post(`${BACKEND_API_PRODUTIVIDADE}fator/pessoa`, fatorMedido) as Observable<ResponseMessage>;
  }

}
