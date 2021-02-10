import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionBase } from 'app/model/questionBase';


@Injectable()
export class QuestionControlService {
  constructor() { }

  toFormGroup(questions: QuestionBase<string>[] ) {
    const group: any = {};

    if(questions && questions.length > 0) {
      questions.forEach(question => {
        group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
                                                : new FormControl(question.value || '');
      });
    }
    
    return new FormGroup(group);
  }
}