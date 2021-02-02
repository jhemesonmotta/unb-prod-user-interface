import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerMedicaoPessoaComponent } from './ver-medicao-pessoa.component';

describe('VerMedicaoPessoaComponent', () => {
  let component: VerMedicaoPessoaComponent;
  let fixture: ComponentFixture<VerMedicaoPessoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerMedicaoPessoaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerMedicaoPessoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
