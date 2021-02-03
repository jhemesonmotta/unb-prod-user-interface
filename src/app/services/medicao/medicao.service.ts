import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BACKEND_API_PRODUTIVIDADE } from '../backend.api';
import { ResponseMessage } from 'app/model/responseMessage';
import { Medicao } from 'app/model/medicao';
import { MedicaoPessoa } from 'app/model/medicaoPessoa';

@Injectable()
export class MedicaoService {

  constructor(private http: HttpClient) {}

  buscarPorId(id: number):Observable<Medicao> {
    return this.http.get(`${BACKEND_API_PRODUTIVIDADE}medicao/empresa/${id}`) as Observable<Medicao>;
  }

  buscarMedicaoPessoaPorId(id: number):Observable<MedicaoPessoa> {
    return this.http.get(`${BACKEND_API_PRODUTIVIDADE}medicao/pessoa/${id}`) as Observable<MedicaoPessoa>;
  }

  listar():Observable<Array<Medicao>> {
    return this.http.get(`${BACKEND_API_PRODUTIVIDADE}medicao/empresa`) as Observable<Array<Medicao>>;
  }

  criar(medicao: Medicao): Observable<ResponseMessage> {
    return this.http.post(`${BACKEND_API_PRODUTIVIDADE}medicao/empresa`, medicao) as Observable<ResponseMessage>;
  }

  listarPessoasPorMedicao(idEmpresa: number):Observable<Array<MedicaoPessoa>> {
    return this.http.get(`${BACKEND_API_PRODUTIVIDADE}medicao/pessoa/medicao/${idEmpresa}`) as Observable<Array<MedicaoPessoa>>;
  }
}
