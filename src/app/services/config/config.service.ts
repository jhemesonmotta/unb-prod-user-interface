import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BACKEND_API_PRODUTIVIDADE } from '../backend.api';
import { ResponseMessage } from 'app/model/responseMessage';
import { Config } from 'app/model/config';

@Injectable()
export class ConfigService {

    constructor(private http: HttpClient) {}

    buscarPorId(id: number):Observable<Config> {
      return this.http.get(`${BACKEND_API_PRODUTIVIDADE}configuracao/${id}`) as Observable<Config>;
    }

    listar():Observable<Array<Config>> {
      return this.http.get(`${BACKEND_API_PRODUTIVIDADE}configuracao`) as Observable<Array<Config>>;
    }
  
    criar(config: Config): Observable<ResponseMessage> {
      return this.http.post(`${BACKEND_API_PRODUTIVIDADE}configuracao`, config) as Observable<ResponseMessage>;
    }
}
