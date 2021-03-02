import { Component, OnInit } from '@angular/core';
import { Fator } from 'app/model/fator';
import { FatorService } from 'app/services/fatores/fator.service';
import { SnackBarService } from 'app/services/snackbar/snack-bar.service';
import { SpinnerService } from 'app/services/spinner.service';

@Component({
  selector: 'app-listar-fatores',
  templateUrl: './listar-fatores.component.html',
  styleUrls: ['./listar-fatores.component.css']
})
export class ListarFatoresComponent implements OnInit {

  fatores: Array<Fator> = [];

  constructor(
    private fatorService: FatorService,
    private spinner: SpinnerService,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit(): void {
    this.carregarFatores();
  }

  editar(fator: Fator) {
    fator.ativo = !fator.ativo;
    this.fatorService.atualizar(fator).subscribe((data) => {
      this.snackBarService.sucesso(data.message);
      window.location.href = './#/factors-list';
    }, (error) => {
      console.log('Error: ');
      console.log(error);

      this.spinner.stopSpinner();
      this.snackBarService.erro('Erro ao criar Fator.');
    });
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
