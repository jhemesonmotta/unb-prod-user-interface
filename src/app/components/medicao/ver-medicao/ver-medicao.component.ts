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
import { MedicaoPessoaComFatores } from 'app/model/medicaoPessoaComFatores';
import { Fator } from 'app/model/fator';
import { FatorService } from 'app/services/fatores/fator.service';
import { MedicaoPessoa } from 'app/model/medicaoPessoa';
import { SharedService } from 'app/services/shared.service';
import { AlocacaoService } from 'app/services/alocacao/alocacao.service';
import { Alocacao } from 'app/model/alocacao';

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
  pessoas: Array<MedicaoPessoaComFatores> = [];
  fatores: Array<Fator> = [];
  alocacoes: Array<Alocacao> = [];
  
  constructor(private route: ActivatedRoute,
    private medicaoService: MedicaoService,
    private spinner: SpinnerService,
    private usuarioService: UserService,
    private empresaService: EmpresaService,
    private fatorService: FatorService,
    private sharedService: SharedService,
    private snackBarService: SnackBarService,
    private alocacaoService: AlocacaoService) { }

  ngOnInit() {
    if (this.sharedService.isLoggedIn()) {
      this.route.params.subscribe(
        (parametros) => {
          if(parametros.id != null) {
            this.usuarioLogado = this.sharedService.getCurrentLogin();
            this.buscarMedicao(parametros.id);
            this.buscarPessoasPorMedicao(parametros.id);
            this.carregarUsuarios();
            this.carregarEmpresas();
            this.carregarFatores();
            this.carregarAlocacoes();
          }
        }
      );
    }
  }
  
  podeFecharMedicao() {
    let alocacaoDesseUsuario:Alocacao = this.alocacoes.filter(
      alocacao => alocacao.empresa.id === this.traduzirEmpresa(this.medicao.empresaId).id
      )[0];

    return this.medicao?.dataFechamento === null && (
      this.usuarioLogado.email === 'jhemesonmotta@gmail.com' || 
      this.usuarioLogado.email === 'jhemeson@gmail.com' || 
      alocacaoDesseUsuario.cargo === 'Gerente'
      || alocacaoDesseUsuario.cargo === 'Diretor');
  }

  podeInserirDados() {
    if (this.usuarioLogado) {
      let minhasMedicoes: Array<MedicaoPessoaComFatores> = this.pessoas
      .filter(mdp => mdp.medicaoPorPessoa.usuarioId === this.usuarioLogado.id);
  
      return this.medicao?.dataFechamento === null && (!minhasMedicoes || minhasMedicoes.length === 0);
    }
    return false;
  }

  fecharMedicao() {
    this.medicao.dataFechamento = new Date().toLocaleDateString();
    this.medicao.notaFechada = Number(this.calcularCoeficienteTotal());
    this.medicaoService.atualizar(this.medicao).subscribe(
      (data) => {
        this.snackBarService.sucesso(data.message);
        this.spinner.stopSpinner();
        this.buscarMedicao(this.medicao.id);
      }, (error) => {
        console.log('Error: ');
        console.log(error);
        this.spinner.stopSpinner();
        this.snackBarService.erro('Erro ao fechar medição.');
      }
    );
  }

  inserirDados() {
    let medicaoPessoa: MedicaoPessoa = {
      id: null,
      data: new Date().toLocaleDateString(),
      medicaoEmpresaId: this.medicao.id,
      usuarioId: this.usuarioLogado.id
    };

    this.medicaoService.criarMedicaoPessoa(medicaoPessoa).subscribe(
      (data) => {
        this.snackBarService.sucesso(data.message);
        this.buscarPessoasPorMedicao(this.medicao.id);
        this.spinner.stopSpinner();
      }, (error) => {
        console.log('Error: ');
        console.log(error);
        this.spinner.stopSpinner();
        this.snackBarService.erro('Erro ao inserir medição.');
      }
    );
  }

  calcularCoeficienteTotal() {
    let coeficienteTotal: number = 0;

    this.pessoas.forEach(pessoaMedicao => {
      coeficienteTotal = coeficienteTotal + this.calcularCoeficientePorPessoa(pessoaMedicao);
    });

    return (coeficienteTotal / this.pessoas.length).toFixed(3);
  }

  calcularCoeficientePorPessoa(medicaoPessoaComFatores: MedicaoPessoaComFatores) {
    
    let coeficienteTotal: number = 0;

    medicaoPessoaComFatores.fatoresMedidos.forEach(fatorMedido => {
      let fatorRelacionado: Fator = this.traduzirFator(fatorMedido.fatorId);
      if (fatorRelacionado) {
        coeficienteTotal = coeficienteTotal + (fatorMedido.nota * fatorRelacionado.pesoDefault);
      }
    });

    return medicaoPessoaComFatores.fatoresMedidos.length > 0 ? coeficienteTotal / medicaoPessoaComFatores.fatoresMedidos.length : 0;
  }

  montaLinkVerMedicaoPessoa(personId: number) {
    return this.medicao? `/measurement/${this.medicao.id}/person/${personId}`: '/';
  }

  traduzirUsuario(id: number) {
    return (id != null && id != 0 && this.usuarios.length > 0) ? this.usuarios.filter(usuario => usuario.id === id)[0].pessoa.nome : id;
  }

  traduzirEmpresa(id: number): Empresa {
    return (id != null && id != 0 && this.empresas.length > 0) ?
      this.empresas.filter(empresa => empresa.id === id)[0] : null;
  }

  traduzirFator(id: number) {
    return (id != null && id != 0 && this.fatores.length > 0) ? this.fatores.filter(fatores => fatores.id === id)[0] : null;
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

  private carregarAlocacoes() {
    this.alocacaoService.getAlocacaoByUsuarioLogado(this.usuarioLogado).subscribe((data) => {
      this.alocacoes = data;
    }, (error) => {
      console.log('Error: ');
      console.log(error);

      this.spinner.stopSpinner();
      this.snackBarService.erro('Erro ao carregar as alocações deste usuário! Tente novamente em alguns instantes.');
    });
  }
}
