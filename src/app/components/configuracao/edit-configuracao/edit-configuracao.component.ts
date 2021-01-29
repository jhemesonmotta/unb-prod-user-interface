import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Config } from 'app/model/config';
import { Empresa } from 'app/model/empresa';
import { UsuarioLogado } from 'app/model/usuarioLogado';
import { ConfigService } from 'app/services/config/config.service';
import { EmpresaService } from 'app/services/empresa/empresa.service';
import { SharedService } from 'app/services/shared.service';
import { SnackBarService } from 'app/services/snackbar/snack-bar.service';
import { SpinnerService } from 'app/services/spinner.service';

@Component({
  selector: 'app-edit-configuracao',
  templateUrl: './edit-configuracao.component.html',
  styleUrls: ['./edit-configuracao.component.css']
})
export class EditConfiguracaoComponent implements OnInit {

  usuarioLogado: UsuarioLogado;
  empresaSelecionada: Empresa;
  configSelecionada: Config;
  
  form = this.fb.group({
    email: new FormControl(null, [Validators.required, Validators.email]),
    nome: new FormControl(null, [Validators.required]),
    perfilGithub: new FormControl(null),
    dataNascimento: new FormControl(null),
    genero: new FormControl(null),
  });
  
  constructor (private fb: FormBuilder,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private spinner: SpinnerService,
    private empresaService: EmpresaService,
    private configService: ConfigService,
    private snackBarService: SnackBarService) { }

    ngOnInit() {
      if (this.sharedService.isLoggedIn()) {
        this.route.params.subscribe(
          (parametros) => {
            if (parametros.idCompany != null && parametros.idConfig != null) {
              this.usuarioLogado = this.sharedService.getCurrentLogin();
              this.buscarEmpresa(parametros.idCompany);
              this.buscarConfig(parametros.idConfig);
            }
          }
        );
      }
    }

    submit() {
    }

    private buscarEmpresa(id: number) {
      this.spinner.showSpinner();
      this.empresaService.buscarPorId(id).subscribe(
        (data) => {
          this.empresaSelecionada = data;
          console.log('data');
          console.log(data);
          this.spinner.stopSpinner();
        }, (error) => {
          console.log('Error: ');
          console.log(error);
  
          this.spinner.stopSpinner();
          this.snackBarService.erro('Erro ao carregar os dados desta empresa!');
        }
      );
    }

    private buscarConfig(id: number) {
      this.spinner.showSpinner();
      this.configService.buscarPorId(id).subscribe(
        (data) => {
          this.configSelecionada = data;
          console.log('data');
          console.log(data);
          this.spinner.stopSpinner();
        }, (error) => {
          console.log('Error: ');
          console.log(error);
  
          this.spinner.stopSpinner();
          this.snackBarService.erro('Erro ao carregar os dados desta configuração!');
        }
      );
    }

}
