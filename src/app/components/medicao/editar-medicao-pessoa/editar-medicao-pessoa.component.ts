import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Empresa } from 'app/model/empresa';
import { Fator } from 'app/model/fator';
import { Medicao } from 'app/model/medicao';
import { MedicaoPessoa } from 'app/model/medicaoPessoa';
import { UsuarioLogado } from 'app/model/usuarioLogado';
import { EmpresaService } from 'app/services/empresa/empresa.service';
import { FatorService } from 'app/services/fatores/fator.service';
import { MedicaoService } from 'app/services/medicao/medicao.service';
import { SnackBarService } from 'app/services/snackbar/snack-bar.service';
import { SpinnerService } from 'app/services/spinner.service';
import { UserService } from 'app/services/usuario/usuario.service';

@Component({
  selector: 'app-editar-medicao-pessoa',
  templateUrl: './editar-medicao-pessoa.component.html',
  styleUrls: ['./editar-medicao-pessoa.component.css']
})
export class EditarMedicaoPessoaComponent implements OnInit {

  medicaoPessoa: MedicaoPessoa;
  medicao: Medicao;
  usuarios: Array<UsuarioLogado> = [];
  empresas: Array<Empresa> = [];
  fatores: Array<Fator> = [];
  coeficienteTotal: number = 0;

  constructor(
    private route: ActivatedRoute,
    private medicaoService: MedicaoService,
    private spinner: SpinnerService,
    private snackBarService: SnackBarService,
    private usuarioService: UserService,
    private empresaService: EmpresaService,
    private fatorService: FatorService,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (parametros) => {
        if(parametros.measurementPersonId != null && parametros.id != null) {
          this.buscarMedicao(parametros.id);
          this.buscarMedicaoPessoa(parametros.measurementPersonId);
          this.carregarUsuarios();
          this.carregarEmpresas();
          this.carregarFatores();
        }
      }
    );
  }

  traduzirUsuario(id: number) {
    return (id != null && id != 0 && this.usuarios.length > 0) ? this.usuarios.filter(usuario => usuario.id === id)[0].pessoa.nome : id;
  }

  traduzirEmpresa(id: number) {
    return (id != null && id != 0 && this.empresas.length > 0) ? this.empresas.filter(empresa => empresa.id === id)[0].nome : '';
  }

  traduzirFator(id: number) {
    return (id != null && id != 0 && this.fatores.length > 0) ? this.fatores.filter(fatores => fatores.id === id)[0] : null;
  }

  private buscarMedicaoPessoa(id: number) {
    this.spinner.showSpinner();
    this.medicaoService.buscarMedicaoPessoaPorId(id).subscribe(
      (data) => {
        this.medicaoPessoa = data;
        console.log('data');
        console.log(data);
        this.spinner.stopSpinner();
      }, (error) => {
        this.spinner.stopSpinner();
        this.snackBarService.erro('Erro ao carregar medição.');
      }
    );
  }

  private buscarMedicao(id: number) {
    this.spinner.showSpinner();
    this.medicaoService.buscarPorId(id).subscribe((data) => {
      console.log('data');
      console.log(data);
      this.medicao = data;
      this.spinner.stopSpinner();
    }, (error) => {
      console.log('Error: ');
      console.log(error);
      this.spinner.stopSpinner();
      this.snackBarService.erro('Erro ao carregar medição.');
    });
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

  private carregarFatores() {
    this.spinner.showSpinner();

    this.fatorService.listar().subscribe(
      (data) => {
        this.fatores = data;
        this.spinner.stopSpinner();
      }, (error) => {
        console.log('Error: ');
        console.log(error);

        this.spinner.stopSpinner();
        this.snackBarService.erro('Erro ao carregar os fatores.');
      }
    );
  }

}
