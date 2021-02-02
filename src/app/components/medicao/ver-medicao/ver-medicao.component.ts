import { Component, OnInit } from '@angular/core';
import { UsuarioLogado } from 'app/model/usuarioLogado';
import { SpinnerService } from 'app/services/spinner.service';
import { SnackBarService } from 'app/services/snackbar/snack-bar.service';
import { ActivatedRoute } from '@angular/router';
import { MedicaoService } from 'app/services/medicao/medicao.service';
import { Medicao } from 'app/model/medicao';
import { Empresa } from 'app/model/empresa';
import { EmpresaService } from 'app/services/empresa/empresa.service';
import { UserService } from 'app/services/usuario/usuario.service';
import { MedicaoPessoa } from 'app/model/medicaoPessoa';

@Component({
  selector: 'app-ver-medicao',
  templateUrl: './ver-medicao.component.html',
  styleUrls: ['./ver-medicao.component.css']
})
export class VerMedicaoComponent implements OnInit {

  usuarioLogado: UsuarioLogado;
  medicao: Medicao;
  usuarios: Array<UsuarioLogado> = [];
  empresas: Array<Empresa> = [];
  pessoas: Array<MedicaoPessoa> = [];
  
  constructor(private route: ActivatedRoute,
    private medicaoService: MedicaoService,
    private spinner: SpinnerService,
    private usuarioService: UserService,
    private empresaService: EmpresaService,
    private snackBarService: SnackBarService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (parametros) => {
        if(parametros.id != null) {
          this.buscarMedicao(parametros.id);
          this.buscarPessoasPorMedicao(parametros.id);
          this.carregarUsuarios();
          this.carregarEmpresas();
        }
      }
    );
  }

  montaLinkVerMedicaoPessoa(personId: number) {
    return `/measurement/${this.medicao.id}/person/${personId}`;
  }

  montaLinkCriarMedicaoPessoa() {
    return `/measurement/${this.medicao.id}/person-create/`;
  }

  traduzirUsuario(id: number) {
    return (id != null && id != 0 && this.usuarios.length > 0) ? this.usuarios.filter(usuario => usuario.id === id)[0].pessoa.nome : id;
  }

  traduzirEmpresa(id: number) {
    return (id != null && id != 0 && this.empresas.length > 0) ? this.empresas.filter(empresa => empresa.id === id)[0].nome : '';
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

  private buscarPessoasPorMedicao(idMedicaoEmpresa: number) {
    this.spinner.showSpinner();
    this.medicaoService.listarPessoasPorMedicao(idMedicaoEmpresa).subscribe((pessoas) => {
      console.log('pessoas');
      console.log(pessoas);
      this.pessoas = pessoas;
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
}
