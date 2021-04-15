import { Component, OnInit } from '@angular/core';
import { Alocacao } from 'app/model/alocacao';
import { Trofeu } from 'app/model/Trofeu';
import { UsuarioLogado } from 'app/model/usuarioLogado';
import { AlocacaoService } from 'app/services/alocacao/alocacao.service';
import { GamificacaoService } from 'app/services/gamificacao/gamificacao.service';
import { SharedService } from 'app/services/shared.service';
import { SnackBarService } from 'app/services/snackbar/snack-bar.service';
import { SpinnerService } from 'app/services/spinner.service';

@Component({
  selector: 'app-sala-trofeus',
  templateUrl: './sala-trofeus.component.html',
  styleUrls: ['./sala-trofeus.component.css']
})
export class SalaTrofeusComponent implements OnInit {

  alocacoes: Array<Alocacao> = [];
  trofeus: Array<Trofeu> = [];
  usuarioLogado: UsuarioLogado;

  constructor(
    private sharedService: SharedService,
    private spinner: SpinnerService,
    private snackBarService: SnackBarService,
    private alocacaoService: AlocacaoService,
    private gamificacaoService: GamificacaoService
  ) { }

  ngOnInit(): void {
    if (this.sharedService.isLoggedIn()) {
      this.usuarioLogado = this.sharedService.getCurrentLogin();
      this.carregarAlocacoes();
    }
  }

  buscarTrofeusPorNivel(nivel) {
    return this.trofeus.filter(t => t.posicaoPodio === nivel);
  }

  private carregarAlocacoes() {
    this.alocacaoService.getAlocacaoByUsuarioLogado(this.usuarioLogado).subscribe((data) => {
      this.alocacoes = data;
      this.carregarTrofeus();
    }, (error) => {
      console.log('Error: ');
      console.log(error);
      this.spinner.stopSpinner();
      this.snackBarService.erro('Erro ao carregar as alocações deste usuário! Tente novamente em alguns instantes.');
    });
  }

  private carregarTrofeus() {
    this.gamificacaoService.buscarTrofeus().subscribe((trofeus) => {
      console.log('trofeus');
      console.log(trofeus);

      this.trofeus = trofeus.filter(t => this.alocacoes.filter(a => a.empresa.id == t.empresaId).length > 0);

      console.log('this.trofeus');
      console.log(this.trofeus);
    }, (error) => {
      console.log('Error: ');
      console.log(error);

      this.spinner.stopSpinner();
      this.snackBarService.erro('Erro ao carregar trofeus.');
    });
  }

  // TODO: buscar todos os troféus de todas as empresas em que o caba tem alocação ativa

}
