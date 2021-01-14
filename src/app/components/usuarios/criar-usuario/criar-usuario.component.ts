import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Empresa } from 'app/model/empresa';
import { Pessoa } from 'app/model/pessoa';
import { RequestCriarUsuario } from 'app/model/requestCriarUsuario';
import { UsuarioLogado } from 'app/model/usuarioLogado';
import { PessoaService } from 'app/services/pessoa/pessoa.service';
import { SharedService } from 'app/services/shared.service';
import { SnackBarService } from 'app/services/snackbar/snack-bar.service';
import { SpinnerService } from 'app/services/spinner.service';
import { UserService } from 'app/services/usuario/usuario.service';


@Component({
  selector: 'app-criar-usuario',
  templateUrl: './criar-usuario.component.html',
  styleUrls: ['./criar-usuario.component.css']
})
export class CriarUsuarioComponent implements OnInit {

  usuarioLogado: UsuarioLogado;

  form = this.fb.group({
    email: new FormControl(null, [Validators.required, Validators.email]),
    nome: new FormControl(null, [Validators.required]),
    perfilGithub: new FormControl(null),
    dataNascimento: new FormControl(null),
    genero: new FormControl(null),
  });
  
  constructor (private fb: FormBuilder,
    private sharedService: SharedService,
    private spinner: SpinnerService,
    private pessoaService: PessoaService,
    private usuarioService: UserService,
    private snackBarService: SnackBarService) { }

    ngOnInit() {
      if (this.sharedService.isLoggedIn()) {
        this.usuarioLogado = this.sharedService.getCurrentLogin();
      }
    }

    submit() {
      if (this.form.valid) {
        this.spinner.showSpinner();
      
        const formData = this.form.getRawValue();
        console.log(formData);

        let pessoa: Pessoa = {
          nome: formData.nome,
          dataNascimento: formData.dataNascimento,
          genero: formData.genero,
          perfilGithub: formData.perfilGithub,
          id: null
        };

        this.pessoaService.criar(pessoa).subscribe(
          (responseCriarPessoa) => {
            pessoa.id = responseCriarPessoa.id;
            
            console.log('pessoa');
            console.log(pessoa);

            let requestCriarUsuario: RequestCriarUsuario = {
              pessoaId: pessoa.id,
              email: formData.email,
              senha: 'MTIzNDU2' // MTIzNDU2 = 123456 in BTOA
            };

            this.usuarioService.criar(requestCriarUsuario).subscribe(
              (data) => {
                this.spinner.stopSpinner();
                this.snackBarService.sucesso('Usuário Criado Com Sucesso.');
              }, (error) => {
                console.log('Error: ');
                console.log(error);
      
                this.spinner.stopSpinner();
                this.snackBarService.erro('Erro ao Criar Usuário.');
              }
            );
          
          }, (error) => {
            console.log('Error: ');
            console.log(error);
  
            this.spinner.stopSpinner();
            this.snackBarService.erro('Erro ao Criar Pessoa.');
          }
        );
      }
    }

}
