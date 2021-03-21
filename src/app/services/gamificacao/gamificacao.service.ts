import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LeaderboardFidelidade } from 'app/model/leaderboardFidelidade';
import { Observable } from 'rxjs/Observable';
import { BACKEND_API_PRODUTIVIDADE } from '../backend.api';

@Injectable()
export class GamificacaoService {

  constructor(private http: HttpClient) {}

  leaderboardFidelidade():Observable<Array<LeaderboardFidelidade>> {
    return this.http.get(`${BACKEND_API_PRODUTIVIDADE}gamificacao/leaderboard/fidelidade`) as Observable<Array<LeaderboardFidelidade>>;
  }

}
