import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder } from '@angular/forms';
import { SharedService } from 'app/services/shared.service';
import { UsuarioLogado } from 'app/model/usuarioLogado';
import { SpinnerService } from 'app/services/spinner.service';

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
    private spinner: SpinnerService) { }

  ngOnInit(): void {
    if (this.sharedService.isLoggedIn()) {
      window.location.href = '/';
    }
  }

  login() {
    this.spinner.showSpinner();

    const user = this.loginForm.getRawValue();

    let usuarioLogado: UsuarioLogado = {
      id: 1,
      email: user.email,
      senha: user.senha,
      pessoa: {
        id: 1,
        nome: 'Jhemeson',
        perfilGithub: 'xxx',
        genero: 'M',
        dataNascimento: '123123123'
      }
    };

    this.sharedService.storeLogin(usuarioLogado);
    window.location.href = '/';

    this.spinner.stopSpinner();
  }

}
