import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder } from '@angular/forms';
import { SharedService } from 'app/services/shared.service';
import { UsuarioLogado } from 'app/model/usuarioLogado';
import { SpinnerService } from 'app/services/spinner.service';
import { RequestLogin } from 'app/model/requestLogin';
import { UserService } from 'app/services/usuario/usuario.service';
import { SnackBarService } from 'app/services/snackbar/snack-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    email: new FormControl(null, [Validators.required]),
    senha: new FormControl(null, [Validators.required])
  });

  constructor(private fb: FormBuilder,
    private sharedService: SharedService,
    private spinner: SpinnerService,
    private usuarioService: UserService,
    private snackBarService: SnackBarService) { }

  ngOnInit(): void {
    if (this.sharedService.isLoggedIn()) {
      window.location.href = '/';
    }
  }

  login() {
    this.spinner.showSpinner();

    const user = this.loginForm.getRawValue();

    const requestLogin: RequestLogin = {
      email: user.email,
      senha: user.senha
    };

    this.usuarioService.login(requestLogin).subscribe((data) => {
      console.log('data');
      console.log(data);

      let usuarioLogado: UsuarioLogado = data;

      this.sharedService.storeLogin(usuarioLogado);
      window.location.href = '/';

      this.spinner.stopSpinner();
      this.snackBarService.sucesso('Login efetuado!');
    }, (error) => {
      console.log('Error: ');
      console.log(error);

      this.spinner.stopSpinner();
      this.snackBarService.erro('Erro! Confira seu e-mail e senha.');
    });
  }
}
