import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BACKEND_API } from '../backend.api';
import { Empresa } from 'app/model/empresa';
import { RequestCriarEmpresa } from 'app/model/requestCriarEmpresa';
import { ResponseMessage } from 'app/model/responseMessage';

@Injectable()
export class EmpresaService {

  constructor(private http: HttpClient) {}

  listar():Observable<Array<Empresa>> {
    return this.http.get(`${BACKEND_API}empresa`) as Observable<Array<Empresa>>;
  }

  criar(alocacao: RequestCriarEmpresa): Observable<ResponseMessage> {
    return this.http.post(`${BACKEND_API}empresa`, alocacao) as Observable<ResponseMessage>;
  }
}
