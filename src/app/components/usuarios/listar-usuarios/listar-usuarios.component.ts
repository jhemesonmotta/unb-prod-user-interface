import { Component, OnInit } from '@angular/core';
import { UsuarioLogado } from 'app/model/usuarioLogado';
import { SnackBarService } from 'app/services/snackbar/snack-bar.service';
import { SpinnerService } from 'app/services/spinner.service';
import { UserService } from 'app/services/usuario/usuario.service';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {

  usuarios: Array<UsuarioLogado> = [];

  constructor(
    private usuarioService: UserService,
    private spinner: SpinnerService,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit(): void {
    this.carregarEmpresas();
  }

  private carregarEmpresas() {
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

}
