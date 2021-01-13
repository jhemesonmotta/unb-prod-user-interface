import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Empresa } from 'app/model/empresa';
import { RequestCriarAlocacao } from 'app/model/requestCriarAlocacao';
import { UsuarioLogado } from 'app/model/usuarioLogado';
import { AlocacaoService } from 'app/services/alocacao/alocacao.service';
import { EmpresaService } from 'app/services/empresa/empresa.service';
import { SharedService } from 'app/services/shared.service';
import { SnackBarService } from 'app/services/snackbar/snack-bar.service';
import { SpinnerService } from 'app/services/spinner.service';

@Component({
  selector: 'app-add-alocacao',
  templateUrl: './add-alocacao.component.html',
  styleUrls: ['./add-alocacao.component.css']
})
export class AddAlocacaoComponent implements OnInit {
  usuarioLogado: UsuarioLogado;

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
  
  constructor (private fb: FormBuilder,
    private sharedService: SharedService,
    private spinner: SpinnerService,
    private snackBarService: SnackBarService,
    private empresaService: EmpresaService,
    private alocacaoService: AlocacaoService) { }

    ngOnInit() {
      if (this.sharedService.isLoggedIn()) {
        this.usuarioLogado = this.sharedService.getCurrentLogin();
        this.carregarEmpresas();
      }
    }

    private carregarEmpresas() {
      this.spinner.showSpinner();

      this.empresaService.listar().subscribe(
        (data) => {
          this.empresas = data;
          this.spinner.stopSpinner();
        }, (error) => {
          console.log('Error: ');
          console.log(error);

          this.spinner.stopSpinner();
          this.snackBarService.erro('Erro ao carregar as empresas.');
        }
      );
    }

    submit() {
      if (this.form.valid) {
        this.spinner.showSpinner();
      
        const formData = this.form.getRawValue();
        console.log(formData);
  
        let request: RequestCriarAlocacao = {
          pessoaId: this.usuarioLogado.pessoa.id,
          empresaId: formData.empresa,
          cargo: formData.cargo,
          dataFim: formData.dataFim,
          dataInicio: formData.dataInicio
        }
  
        this.alocacaoService.criar(request).subscribe(
          (data) => {
            this.snackBarService.sucesso(data.message);
            window.location.href = '/#/user-profile';
          }, (error) => {
            console.log('Error: ');
            console.log(error);
  
            this.spinner.stopSpinner();
            this.snackBarService.erro('Erro ao criar Alocação.');
          }
        );
  
        this.spinner.stopSpinner();
      }
    }
}
