import { Component, OnInit } from '@angular/core';
import { SharedService } from 'app/services/shared.service';
import { UsuarioLogado } from 'app/model/usuarioLogado';
import { AlocacaoService } from 'app/services/alocacao/alocacao.service';
import { SpinnerService } from 'app/services/spinner.service';
import { SnackBarService } from 'app/services/snackbar/snack-bar.service';
import { Alocacao } from 'app/model/alocacao';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  usuarioLogado: UsuarioLogado;
  alocacoes: Array<Alocacao> = [];

  constructor(private sharedService: SharedService,
    private alocacaoService: AlocacaoService,
    private spinner: SpinnerService,
    private snackBarService: SnackBarService) { }

  ngOnInit() {
    if (this.sharedService.isLoggedIn()) {
      this.usuarioLogado = this.sharedService.getCurrentLogin();
      this.carregarAlocacoes();
    }
  }

  definirRotaAdicionarAlocacao() {
    return '/user-profile/add-alocation/' + this.usuarioLogado.pessoa.id;
  }

  private carregarAlocacoes() {
    this.alocacaoService.getAlocacaoByUsuarioLogado(this.usuarioLogado).subscribe((data) => {
      console.log('data');
      console.log(data);
      this.alocacoes = data;
    }, (error) => {
      console.log('Error: ');
      console.log(error);

      this.spinner.stopSpinner();
      this.snackBarService.erro('Erro ao carregar as alocações deste usuário! Tente novamente em alguns instantes.');
    });
  }

}
