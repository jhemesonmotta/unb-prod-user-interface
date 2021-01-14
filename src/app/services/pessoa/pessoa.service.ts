import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BACKEND_API } from '../backend.api';
import { ResponseMessage } from 'app/model/responseMessage';
import { Pessoa } from 'app/model/pessoa';

@Injectable()
export class PessoaService {

  constructor(private http: HttpClient) {}

  criar(pessoa: Pessoa): Observable<ResponseMessage> {
    return this.http.post(`${BACKEND_API}pessoa`, pessoa) as Observable<ResponseMessage>;
  }
}
