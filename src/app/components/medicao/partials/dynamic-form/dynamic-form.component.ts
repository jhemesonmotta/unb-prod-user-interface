import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Fator } from 'app/model/fator';
import { FatorMedido } from 'app/model/fatorMedido';
import { MedicaoPessoa } from 'app/model/medicaoPessoa';
import { QuestionBase } from 'app/model/questionBase';
import { TextboxQuestion } from 'app/model/textboxQuestion';
import { QuestionControlService } from 'app/services/dynamicForm/questionControlService';
import { FatorService } from 'app/services/fatores/fator.service';
import { FatorMedidoService } from 'app/services/medicao/fator.medido.service';
import { SnackBarService } from 'app/services/snackbar/snack-bar.service';
import { SpinnerService } from 'app/services/spinner.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [ QuestionControlService ]
})
export class DynamicFormComponent implements OnInit {

  @Input()
  medicaoPessoa: MedicaoPessoa;

  questions: QuestionBase<string>[] = [];
  fatores: Array<Fator> = [];
  form: FormGroup;

  constructor(
    private questionControlService: QuestionControlService,
    private fatorService: FatorService,
    private fatorMedidoService: FatorMedidoService,
    private spinner: SpinnerService,
    private snackBarService: SnackBarService) { }

  ngOnInit() {
    this.form = this.questionControlService.toFormGroup(this.questions);
    this.carregarFatores();
  }

  onSubmit() {
    this.spinner.showSpinner();

    this.questions.map(question => question.value = this.form.getRawValue()[question.key]);
    let fatoresMedidos:Array<FatorMedido> = [];
    
    this.questions.forEach(question => {
      let fatorMedido: FatorMedido = {
        id: null,
        comentarios: '',
        fatorId: Number(question.key.split('-')[1]),
        nota: Number(question.value),
        medicaoPorPessoaId: this.medicaoPessoa.id
      };
      fatoresMedidos.push(fatorMedido);
    });

    this.fatorMedidoService.criarLista({listaFatores: fatoresMedidos}).subscribe(
      (data) => {
        this.snackBarService.sucesso(data[0].message);
        this.spinner.stopSpinner();
        window.location.href = `/#/measurement/${this.medicaoPessoa.medicaoEmpresaId}`;
      }, (error) => {
        console.log('Error: ');
        console.log(error);

        this.spinner.stopSpinner();
        this.snackBarService.erro('Erro ao criar Alocação.');
      }
    );
  }

  montarQuestoes() {
    let questoesRetorno:Array<TextboxQuestion> = [];

    this.fatores.forEach(fator => {
      let novaQuestao: TextboxQuestion = new TextboxQuestion({
        key: `campo-${fator.id}`,
        label: fator.nome,
        required: true,
        controlType: fator.descricao,
        order: 1,
        type: 'number',
        value: '5'
      });

      questoesRetorno.push(novaQuestao);
    });

    let questoesBase: QuestionBase<string>[] = [
      ...questoesRetorno
    ];

    this.questions = questoesBase;
    this.form = this.questionControlService.toFormGroup(this.questions);
  }

  private carregarFatores() {
    this.fatorService.listar().subscribe(
      (data) => {
        this.fatores = data;
        this.montarQuestoes();
      }, (error) => {
        console.log('Error: ');
        console.log(error);
      }
    );
  }

}
