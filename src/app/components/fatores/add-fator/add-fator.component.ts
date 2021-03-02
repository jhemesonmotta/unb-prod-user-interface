import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UsuarioLogado } from 'app/model/usuarioLogado';
import { FatorService } from 'app/services/fatores/fator.service';
import { SharedService } from 'app/services/shared.service';
import { SnackBarService } from 'app/services/snackbar/snack-bar.service';
import { SpinnerService } from 'app/services/spinner.service';

@Component({
  selector: 'app-add-fator',
  templateUrl: './add-fator.component.html',
  styleUrls: ['./add-fator.component.css']
})
export class AddFatorComponent implements OnInit {

  RESPONSABILIDADES: string[] = [
    'Gerência',
    'Desenvolvedores/Testadores',
    'Todos'
  ];

  CATEGORIAS: string[] = [
    'Pessoas',
    'Produto',
    'Organização',
    'Software Livre'
  ];

  usuarioLogado: UsuarioLogado;

  form = this.fb.group({
    nome: new FormControl(null, [Validators.required]),
    descricao: new FormControl(null, [Validators.required]),
    tipoDeUsuarioPreenchendo: new FormControl('Todos'),
    pesoDefault: new FormControl(1),
    categoria: new FormControl(null),
    textoDoInputTextual: new FormControl(null),
    ativo: new FormControl(false)
  });
  
  constructor (private fb: FormBuilder,
    private sharedService: SharedService,
    private spinner: SpinnerService,
    private fatorService: FatorService,
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

        this.fatorService.criar(formData).subscribe(
          (data) => {
            this.snackBarService.sucesso(data.message);
            this.spinner.stopSpinner();
            window.location.href = './#/factors-list';
          }, (error) => {
            console.log('Error: ');
            console.log(error);
  
            this.spinner.stopSpinner();
            this.snackBarService.erro('Erro ao criar Fator.');
          }
        );
      }
    }

}
