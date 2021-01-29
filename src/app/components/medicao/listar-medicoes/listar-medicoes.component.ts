import { Component, OnInit } from '@angular/core';
import { Empresa } from 'app/model/empresa';
import { Medicao } from 'app/model/medicao';
import { UsuarioLogado } from 'app/model/usuarioLogado';
import { EmpresaService } from 'app/services/empresa/empresa.service';
import { MedicaoService } from 'app/services/medicao/medicao.service';
import { SnackBarService } from 'app/services/snackbar/snack-bar.service';
import { SpinnerService } from 'app/services/spinner.service';
import { UserService } from 'app/services/usuario/usuario.service';

@Component({
  selector: 'app-listar-medicoes',
  templateUrl: './listar-medicoes.component.html',
  styleUrls: ['./listar-medicoes.component.css']
})
export class ListarMedicoesComponent implements OnInit {

  medicoes: Array<Medicao> = [];
  usuarios: Array<UsuarioLogado> = [];
  empresas: Array<Empresa> = [];
  
  constructor(
    private usuarioService: UserService,
    private spinner: SpinnerService,
    private snackBarService: SnackBarService,
    private medicaoService: MedicaoService,
    private empresaService: EmpresaService
  ) { }

  ngOnInit(): void {
    this.carregarMedicoes();
    this.carregarUsuarios();
    this.carregarEmpresas();
  }

  traduzirUsuario(id: number) {
    return (id != null && id != 0 && this.usuarios.length > 0) ? this.usuarios.filter(usuario => usuario.id === id)[0].pessoa.nome : '';
  }

  traduzirEmpresa(id: number) {
    return (id != null && id != 0 && this.empresas.length > 0) ? this.empresas.filter(empresa => empresa.id === id)[0].nome : '';
  }

  private carregarMedicoes() {
    this.spinner.showSpinner();

    this.medicaoService.listar().subscribe(
      (data) => {
        this.medicoes = data;
        console.log('data');
        console.log(data);
        this.spinner.stopSpinner();
      }, (error) => {
        console.log('Error: ');
        console.log(error);
        this.spinner.stopSpinner();
        this.snackBarService.erro('Erro ao carregar as medições.');
      }
    );
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
}
