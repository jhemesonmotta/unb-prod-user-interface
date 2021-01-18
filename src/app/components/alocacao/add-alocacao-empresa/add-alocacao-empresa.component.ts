import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Empresa } from 'app/model/empresa';
import { RequestCriarAlocacao } from 'app/model/requestCriarAlocacao';
import { UsuarioLogado } from 'app/model/usuarioLogado';
import { AlocacaoService } from 'app/services/alocacao/alocacao.service';
import { EmpresaService } from 'app/services/empresa/empresa.service';
import { SharedService } from 'app/services/shared.service';
import { SnackBarService } from 'app/services/snackbar/snack-bar.service';
import { SpinnerService } from 'app/services/spinner.service';
import { UserService } from 'app/services/usuario/usuario.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-add-alocacao-empresa',
  templateUrl: './add-alocacao-empresa.component.html',
  styleUrls: ['./add-alocacao-empresa.component.css']
})
export class AddAlocacaoEmpresaComponent implements OnInit {
  empresaSelecionada: Empresa;
  usuarioLogado: UsuarioLogado;
  usuarios: Array<UsuarioLogado> = [];

  myControl = new FormControl();
  filteredOptions: Observable<UsuarioLogado[]>;

  cargos: string[] = [
    'Diretor',
    'Gerente',
    'Desenvolvedor',
    'Testador',
    'Outro'
  ];

  empresas: Array<Empresa> = [];

  form = this.fb.group({
    usuario: new FormControl(null),
    cargo: new FormControl(null, [Validators.required]),
    dataInicio: new FormControl(null, [Validators.required]),
    dataFim: new FormControl(null)
  });
  
  constructor (private fb: FormBuilder,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private spinner: SpinnerService,
    private snackBarService: SnackBarService,
    private empresaService: EmpresaService,
    private usuarioService: UserService,
    private alocacaoService: AlocacaoService) { }

    ngOnInit() {
      this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

      this.route.params.subscribe(
        (parametros) => {
          if(parametros.id != null) {
            this.buscarEmpresa(parametros.id);
          }
        }
      );

      if (this.sharedService.isLoggedIn()) {
        this.usuarioLogado = this.sharedService.getCurrentLogin();
        this.carregarUsuarios();
      }
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

    private _filter(value: string): UsuarioLogado[] {
      const filterValue = value.toLowerCase();
      return this.usuarios.filter(usuario => usuario.email.toLowerCase().includes(filterValue));
    }

    private filtrarUsuarioPorEmail(email: string): UsuarioLogado {
      const filterValue = email.toLowerCase();
      return this.usuarios.filter(usuario => usuario.email.toLowerCase().includes(filterValue))[0];
    }

    private carregarUsuarios() {
      this.spinner.showSpinner();
  
      this.usuarioService.listar().subscribe(
        (data) => {
          this.usuarios = data;
          this.spinner.stopSpinner();
        }, (error) => {
          console.log('Error: ');
          console.log(error);
  
          this.spinner.stopSpinner();
          this.snackBarService.erro('Erro ao carregar os usuários.');
        }
      );
    }

    submit() {
      let usuarioSelecionado: UsuarioLogado = this.filtrarUsuarioPorEmail(this.myControl.value);

      if (this.form.valid) {
        this.spinner.showSpinner();
      
        const formData = this.form.getRawValue();
        console.log(formData);
  
        let request: RequestCriarAlocacao = {
          pessoaId: usuarioSelecionado.pessoa.id,
          empresaId: this.empresaSelecionada.id,
          cargo: formData.cargo,
          dataFim: formData.dataFim,
          dataInicio: formData.dataInicio
        }
  
        this.alocacaoService.criar(request).subscribe(
          (data) => {
            this.snackBarService.sucesso(data.message);
            window.location.href = `/#/company/${this.empresaSelecionada.id}`;
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
