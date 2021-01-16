import { Component, OnInit } from '@angular/core';
import { SharedService } from 'app/services/shared.service';
import { AlocacaoService } from 'app/services/alocacao/alocacao.service';
import { SpinnerService } from 'app/services/spinner.service';
import { SnackBarService } from 'app/services/snackbar/snack-bar.service';
import { Alocacao } from 'app/model/alocacao';
import { Empresa } from 'app/model/empresa';
import { EmpresaService } from 'app/services/empresa/empresa.service';

@Component({
  selector: 'app-visualizar-empresa',
  templateUrl: './visualizar-empresa.component.html',
  styleUrls: ['./visualizar-empresa.component.css']
})
export class VisualizarEmpresaComponent implements OnInit {

  empresaSelecionada: Empresa;
  alocacoes: Array<Alocacao> = [];

  constructor(private sharedService: SharedService,
    private alocacaoService: AlocacaoService,
    private empresaService: EmpresaService,
    private spinner: SpinnerService,
    private snackBarService: SnackBarService) { }

  ngOnInit() {
    if (this.sharedService.isLoggedIn()) {
      this.buscarEmpresa(1);
    }
  }

  definirRotaAdicionarAlocacao() {
    return '/user-profile/add-alocation/';
  }

  private carregarAlocacoes() {
    this.spinner.showSpinner();

    this.alocacaoService.getAlocacaoByEmpresa(this.empresaSelecionada).subscribe((data) => {
      console.log('data');
      console.log(data);
      this.alocacoes = data;
      this.spinner.stopSpinner();
    }, (error) => {
      console.log('Error: ');
      console.log(error);

      this.spinner.stopSpinner();
      this.snackBarService.erro('Erro ao carregar as alocações desta empresa! Tente novamente em alguns instantes.');
    });
  }

  private buscarEmpresa(id: number) {
    this.spinner.showSpinner();

    this.empresaService.buscarPorId(id).subscribe(
      (data) => {
        this.empresaSelecionada = data;
        this.spinner.stopSpinner();

        this.carregarAlocacoes();
      }, (error) => {
        console.log('Error: ');
        console.log(error);

        this.spinner.stopSpinner();
        this.snackBarService.erro('Erro ao carregar os dados desta empresa!');
      }
    );
  }
}
