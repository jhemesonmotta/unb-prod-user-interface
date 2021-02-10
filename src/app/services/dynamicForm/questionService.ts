import { Injectable } from '@angular/core';
import { QuestionBase } from 'app/model/questionBase';
import { TextboxQuestion } from 'app/model/textboxQuestion';
import { of } from 'rxjs';

@Injectable()
export class QuestionService {

  // TODO: get from a remote source of question metadata
  getQuestions() {

    const questions: QuestionBase<string>[] = [

      new TextboxQuestion({
        key: 'firstName',
        label: 'First name',
        value: 'Bombasto',
        required: true,
        order: 1
      }),

      new TextboxQuestion({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        order: 2
      }),

    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }
}
