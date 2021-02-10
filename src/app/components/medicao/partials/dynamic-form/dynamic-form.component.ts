import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from 'app/model/questionBase';
import { QuestionControlService } from 'app/services/dynamicForm/questionControlService';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
  providers: [ QuestionControlService ]
})
export class DynamicFormComponent implements OnInit {

  @Input()
  questions: QuestionBase<string>[] = [];
  form: FormGroup;

  constructor(private qcs: QuestionControlService) { }

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);
    console.log('this.questions');
    console.log(this.questions);
  }

  onSubmit() {
    console.log('this.form.getRawValue()');
    console.log(this.form.getRawValue());
  }

}
