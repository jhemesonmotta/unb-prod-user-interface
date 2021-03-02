import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BACKEND_API_USUARIOS } from '../backend.api';
import { Empresa } from 'app/model/empresa';
import { RequestCriarEmpresa } from 'app/model/requestCriarEmpresa';
import { ResponseMessage } from 'app/model/responseMessage';

@Injectable()
export class EmpresaService {

  constructor(private http: HttpClient) {}

  buscarPorId(id: number):Observable<Empresa> {
    return this.http.get(`${BACKEND_API_USUARIOS}empresa/${id}`) as Observable<Empresa>;
  }

  listar():Observable<Array<Empresa>> {
    return this.http.get(`${BACKEND_API_USUARIOS}empresa`) as Observable<Array<Empresa>>;
  }

  criar(empresa: RequestCriarEmpresa): Observable<ResponseMessage> {
    return this.http.post(`${BACKEND_API_USUARIOS}empresa`, empresa) as Observable<ResponseMessage>;
  }

  atualizar(empresa: Empresa): Observable<ResponseMessage> {
    return this.http.put(`${BACKEND_API_USUARIOS}empresa`, empresa) as Observable<ResponseMessage>;
  }
}
