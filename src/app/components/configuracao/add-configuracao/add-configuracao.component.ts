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
  selector: 'app-add-configuracao',
  templateUrl: './add-configuracao.component.html',
  styleUrls: ['./add-configuracao.component.css']
})
export class AddConfiguracaoComponent implements OnInit {

  usuarioLogado: UsuarioLogado;
  empresaSelecionada: Empresa;
  
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
            if(parametros.id != null) {
              this.usuarioLogado = this.sharedService.getCurrentLogin();
              this.buscarEmpresa(parametros.id);
            }
          }
        );
      }
    }

    submit() {
      let novaConfig: Config = {
        dataCriacao: new Date().toLocaleDateString(),
        empresaId: this.empresaSelecionada.id,
        id: null
      };

      this.configService.criar(novaConfig).subscribe((data) => {
        this.snackBarService.sucesso(data.message);
        window.location.href = './#/configs-list';
      }, (error) => {
        console.log('Error: ');
        console.log(error);

        this.spinner.stopSpinner();
        this.snackBarService.erro('Erro ao criar configuração.');
      });

    }

    private buscarEmpresa(id: number) {
      this.spinner.showSpinner();
  
      this.empresaService.buscarPorId(id).subscribe(
        (data) => {
          this.empresaSelecionada = data;
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
