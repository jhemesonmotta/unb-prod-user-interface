import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarMedicaoPessoaComponent } from './criar-medicao-pessoa.component';

describe('CriarMedicaoPessoaComponent', () => {
  let component: CriarMedicaoPessoaComponent;
  let fixture: ComponentFixture<CriarMedicaoPessoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriarMedicaoPessoaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarMedicaoPessoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
