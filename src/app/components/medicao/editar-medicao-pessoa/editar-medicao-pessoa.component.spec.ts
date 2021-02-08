import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarMedicaoPessoaComponent } from './editar-medicao-pessoa.component';

describe('EditarMedicaoPessoaComponent', () => {
  let component: EditarMedicaoPessoaComponent;
  let fixture: ComponentFixture<EditarMedicaoPessoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarMedicaoPessoaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarMedicaoPessoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
