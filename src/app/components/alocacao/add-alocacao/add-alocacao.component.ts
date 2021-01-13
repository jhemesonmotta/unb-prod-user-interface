import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UsuarioLogado } from 'app/model/usuarioLogado';
import { SharedService } from 'app/services/shared.service';
import { SnackBarService } from 'app/services/snackbar/snack-bar.service';
import { SpinnerService } from 'app/services/spinner.service';

@Component({
  selector: 'app-add-alocacao',
  templateUrl: './add-alocacao.component.html',
  styleUrls: ['./add-alocacao.component.css']
})
export class AddAlocacaoComponent implements OnInit {
  usuarioLogado: UsuarioLogado;

  foods: any[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  form = this.fb.group({
    empresa: new FormControl(null, [Validators.required]),
    cargo: new FormControl(null, [Validators.required]),
    dataInicio: new FormControl(null, [Validators.required]),
    dataFim: new FormControl(null)
  });
  
  constructor (private fb: FormBuilder,
    private sharedService: SharedService,
    private spinner: SpinnerService,
    private snackBarService: SnackBarService) { }

    ngOnInit() {
      if (this.sharedService.isLoggedIn()) {
        this.usuarioLogado = this.sharedService.getCurrentLogin();
      }
    }

    submit() {
      this.spinner.showSpinner();

      const formData = this.form.getRawValue();
      console.log(formData);

      this.spinner.stopSpinner();
    }

}
