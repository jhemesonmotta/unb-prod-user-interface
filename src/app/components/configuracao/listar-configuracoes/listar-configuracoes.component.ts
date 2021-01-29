import { Component, OnInit } from '@angular/core';
import { Alocacao } from 'app/model/alocacao';
import { Config } from 'app/model/config';
import { UsuarioLogado } from 'app/model/usuarioLogado';
import { AlocacaoService } from 'app/services/alocacao/alocacao.service';
import { ConfigService } from 'app/services/config/config.service';
import { SharedService } from 'app/services/shared.service';
import { SnackBarService } from 'app/services/snackbar/snack-bar.service';
import { SpinnerService } from 'app/services/spinner.service';

@Component({
  selector: 'app-listar-configuracoes',
  templateUrl: './listar-configuracoes.component.html',
  styleUrls: ['./listar-configuracoes.component.css']
})
export class ListarConfiguracoesComponent implements OnInit {

  usuarioLogado: UsuarioLogado;
  configuracoes: Array<Config> = [];
  alocacoes: Array<Alocacao> = [];

  constructor(
    private sharedService: SharedService,
    private spinner: SpinnerService,
    private snackBarService: SnackBarService,
    private alocacaoService: AlocacaoService,
    private configService: ConfigService
  ) { }

  ngOnInit(): void {
    if (this.sharedService.isLoggedIn()) {
      this.usuarioLogado = this.sharedService.getCurrentLogin();
      this.carregarConfiguracoes();
    }
  }

  private carregarConfiguracoes() {
    this.spinner.showSpinner();

    this.alocacaoService.getAlocacaoByUsuarioLogado(this.usuarioLogado).subscribe((responseAlocacao) => {
      console.log('responseAlocacao');
      console.log(responseAlocacao);
      this.alocacoes = responseAlocacao;

      this.configService.listar().subscribe(
        (responseConfigs) => {
          this.configuracoes = responseConfigs.filter(conf => this.alocacoes.filter(aloc => aloc.empresa.id === conf.empresaId).length > 0);
          
          console.log('this.configuracoes');
          console.log(this.configuracoes);

          this.spinner.stopSpinner();
        }, (error) => {
          console.log('Error: ');
          console.log(error);

          this.spinner.stopSpinner();
          this.snackBarService.erro('Erro ao carregar as configurações!');
        }
      );
    }, (error) => {
      console.log('Error: ');
      console.log(error);

      this.spinner.stopSpinner();
      this.snackBarService.erro('Erro ao carregar as alocações deste usuário! Tente novamente em alguns instantes.');
    });
  }

}
