import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAlocacaoEmpresaComponent } from './add-alocacao-empresa.component';

describe('AddAlocacaoEmpresaComponent', () => {
  let component: AddAlocacaoEmpresaComponent;
  let fixture: ComponentFixture<AddAlocacaoEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAlocacaoEmpresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAlocacaoEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
