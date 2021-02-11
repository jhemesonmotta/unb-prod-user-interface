import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Fator } from 'app/model/fator';
import { QuestionBase } from 'app/model/questionBase';
import { TextboxQuestion } from 'app/model/textboxQuestion';
import { QuestionControlService } from 'app/services/dynamicForm/questionControlService';
import { FatorService } from 'app/services/fatores/fator.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [ QuestionControlService ]
})
export class DynamicFormComponent implements OnInit {

  questions: QuestionBase<string>[] = [];
  fatores: Array<Fator> = [];
  form: FormGroup;

  constructor(
    private questionControlService: QuestionControlService,
    private fatorService: FatorService) { }

  ngOnInit() {
    this.form = this.questionControlService.toFormGroup(this.questions);
    this.carregarFatores();
  }

  onSubmit() {
    console.log('this.form.getRawValue()');
    console.log(this.form.getRawValue());

    console.log('this.questions');
    console.log(this.questions);
  }

  montarQuestoes() {
    let questoesRetorno:Array<TextboxQuestion> = [];

    this.fatores.forEach(fator => {
      let novaQuestao: TextboxQuestion = new TextboxQuestion({
        key: `campo-${fator.id}`,
        label: fator.nome,
        required: true,
        controlType: 'textbox',
        order: 1,
        type: 'text'
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
