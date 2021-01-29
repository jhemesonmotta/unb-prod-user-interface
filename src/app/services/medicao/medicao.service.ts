import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BACKEND_API_PRODUTIVIDADE } from '../backend.api';
import { ResponseMessage } from 'app/model/responseMessage';
import { Medicao } from 'app/model/medicao';

@Injectable()
export class MedicaoService {

  constructor(private http: HttpClient) {}

  buscarPorId(id: number):Observable<Medicao> {
    return this.http.get(`${BACKEND_API_PRODUTIVIDADE}medicao/empresa/${id}`) as Observable<Medicao>;
  }

  listar():Observable<Array<Medicao>> {
    return this.http.get(`${BACKEND_API_PRODUTIVIDADE}medicao/empresa`) as Observable<Array<Medicao>>;
  }

  criar(medicao: Medicao): Observable<ResponseMessage> {
    return this.http.post(`${BACKEND_API_PRODUTIVIDADE}medicao/empresa`, medicao) as Observable<ResponseMessage>;
  }
}
