import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Alocacao } from 'app/model/alocacao';
import { Empresa } from 'app/model/empresa';
import { Medicao } from 'app/model/medicao';
import { UsuarioLogado } from 'app/model/usuarioLogado';
import { AlocacaoService } from 'app/services/alocacao/alocacao.service';
import { EmpresaService } from 'app/services/empresa/empresa.service';
import { MedicaoService } from 'app/services/medicao/medicao.service';
import { SharedService } from 'app/services/shared.service';
import { SnackBarService } from 'app/services/snackbar/snack-bar.service';
import { SpinnerService } from 'app/services/spinner.service';

@Component({
  selector: 'app-criar-medicao',
  templateUrl: './criar-medicao.component.html',
  styleUrls: ['./criar-medicao.component.css']
})
export class CriarMedicaoComponent implements OnInit {

  usuarioLogado: UsuarioLogado;
  dataCriacao: string = new Date().toLocaleDateString();
  empresas: Array<Empresa> = [];
  alocacoes: Array<Alocacao> = [];

  form = this.fb.group({
    empresa: new FormControl(null, [Validators.required]),
  });

  constructor(
    private fb: FormBuilder,
    private sharedService: SharedService,
    private medicaoService: MedicaoService,
    private empresaService: EmpresaService,
    private alocacaoService: AlocacaoService,
    private spinner: SpinnerService,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit(): void {
    if (this.sharedService.isLoggedIn()) {
      this.usuarioLogado = this.sharedService.getCurrentLogin();
      this.carregarAlocacoes();
    }
  }

  submit() {
    const formData = this.form.getRawValue();

    let novaMedicao: Medicao = {
      id: null,
      configuracaoMedicaoId: 1, // TODO: No Futuro, quando for usar isso, tem que buscar a configuração relacionada a empresa
      criadorId: this.usuarioLogado.id,
      dataCriacao: this.dataCriacao,
      dataFechamento: null,
      empresaId: formData.empresa,
      notaFechada: null,
      status: true
    };

    this.medicaoService.criar(novaMedicao).subscribe(
      (data) => {
        this.snackBarService.sucesso(data.message);
        window.location.href = '/#/measurement-list';
      }, (error) => {
        console.log('Error: ');
        console.log(error);
        this.spinner.stopSpinner();
        this.snackBarService.erro('Erro ao criar Medição.');
      }
    );

  }

  private carregarEmpresas() {
    this.spinner.showSpinner();

    this.empresaService.listar().subscribe(
      (data) => {
        this.empresas = data;
        // i.e.: empresas onde o usuário tem alocação
        this.empresas = this.empresas.filter(empresa => this.alocacoes.filter(alocacao => alocacao.empresa.id === empresa.id).length > 0);
        this.spinner.stopSpinner();
      }, (error) => {
        console.log('Error: ');
        console.log(error);

        this.spinner.stopSpinner();
        this.snackBarService.erro('Erro ao carregar as empresas.');
      }
    );
  }

  private carregarAlocacoes() {
    this.alocacaoService.getAlocacaoByUsuarioLogado(this.usuarioLogado).subscribe((data) => {
      console.log('data');
      console.log(data);
      this.alocacoes = data;

      this.carregarEmpresas();
    }, (error) => {
      console.log('Error: ');
      console.log(error);

      this.spinner.stopSpinner();
      this.snackBarService.erro('Erro ao carregar as alocações deste usuário! Tente novamente em alguns instantes.');
    });
  }

}
