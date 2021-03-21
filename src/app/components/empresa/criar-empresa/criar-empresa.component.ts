import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Empresa } from 'app/model/empresa';
import { RequestCriarAlocacao } from 'app/model/requestCriarAlocacao';
import { RequestCriarEmpresa } from 'app/model/requestCriarEmpresa';
import { UsuarioLogado } from 'app/model/usuarioLogado';
import { AlocacaoService } from 'app/services/alocacao/alocacao.service';
import { EmpresaService } from 'app/services/empresa/empresa.service';
import { SharedService } from 'app/services/shared.service';
import { SnackBarService } from 'app/services/snackbar/snack-bar.service';
import { SpinnerService } from 'app/services/spinner.service';


@Component({
  selector: 'app-criar-empresa',
  templateUrl: './criar-empresa.component.html',
  styleUrls: ['./criar-empresa.component.css']
})
export class CriarEmpresaComponent implements OnInit {

  usuarioLogado: UsuarioLogado;
  empresaSelecionada: Empresa;

  textoCabecalho = 'Criar Empresa';
  textoDescricao = 'Atenção! Ao adicionar uma empresa, automaticamente uma alocação do usuário responsável pela adição é criada.';

  cargos: string[] = [
    'Diretor',
    'Gerente',
    'Desenvolvedor',
    'Testador',
    'Outro'
  ];

  empresas: Array<Empresa> = [];

  form = this.fb.group({
    empresa: new FormControl(null, [Validators.required]),
    cargo: new FormControl(null, [Validators.required]),
    dataInicio: new FormControl(null, [Validators.required]),
    dataFim: new FormControl(null)
  });
  
  constructor (
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private sharedService: SharedService,
    private spinner: SpinnerService,
    private snackBarService: SnackBarService,
    private alocacaoService: AlocacaoService,
    private empresaService: EmpresaService) { }

    ngOnInit() {
      if (this.sharedService.isLoggedIn()) {
        this.usuarioLogado = this.sharedService.getCurrentLogin();
        this.route.params.subscribe(
          (parametros) => {
            if(parametros.id != null) {
              this.buscarEmpresa(parametros.id);
            }
          }
        );
      }
    }

    create() {
      if (this.form.valid) {
        this.spinner.showSpinner();
      
        const formData = this.form.getRawValue();
        console.log(formData);

        let criarEmpresaRequest: RequestCriarEmpresa = {
          dataCadastro: new Date().toLocaleDateString(),
          nome: formData.empresa
        };

        this.empresaService.criar(criarEmpresaRequest).subscribe(
          (responseCriarEmpresa) => {

            let requestCriarAlocacao: RequestCriarAlocacao = {
              pessoaId: this.usuarioLogado.pessoa.id,
              empresaId: responseCriarEmpresa.id,
              cargo: formData.cargo,
              dataFim: formData.dataFim,
              dataInicio: formData.dataInicio
            }

            this.alocacaoService.criar(requestCriarAlocacao).subscribe(
              (data) => {
                this.snackBarService.sucesso(data.message);
                window.location.href = './#/companies-list';
                this.spinner.stopSpinner();
              }, (error) => {
                console.log('Error: ');
                console.log(error);
      
                this.spinner.stopSpinner();
                this.snackBarService.erro('Erro ao criar Alocação.');
              }
            );
          }, (error) => {
            console.log('Error: ');
            console.log(error);
  
            this.spinner.stopSpinner();
            this.snackBarService.erro('Erro ao Criar Empresa.');
          }
        );
      }
    }

    update() {
      if (this.form.valid) {
        this.spinner.showSpinner();
      
        const formData = this.form.getRawValue();
        console.log(formData);

        this.empresaSelecionada.nome = formData.empresa;

        this.empresaService.atualizar(this.empresaSelecionada).subscribe(
          (data) => {
            window.location.href = './#/companies-list';
            this.snackBarService.sucesso(data.message);
          }, (error) => {
            console.log('Error: ');
            console.log(error);
  
            this.spinner.stopSpinner();
            this.snackBarService.erro('Erro ao Criar Empresa.');
          }
        );
      }
    }


    private buscarEmpresa(id: number) {
      this.spinner.showSpinner();
  
      this.empresaService.buscarPorId(id).subscribe(
        (data) => {
          this.empresaSelecionada = data;

          this.textoCabecalho = 'Editar Empresa';
          this.textoDescricao = '';

          this.form = this.fb.group({
            empresa: new FormControl(this.empresaSelecionada.nome, [Validators.required]),
          });
          this.spinner.stopSpinner();
        }, (error) => {
          console.log('Error: ');
          console.log(error);
  
          this.spinner.stopSpinner();
          this.snackBarService.erro('Erro ao carregar os dados desta empresa!');
        }
      );
    }

}
