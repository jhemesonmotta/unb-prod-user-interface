import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarMedicoesComponent } from './listar-medicoes.component';

describe('ListarMedicoesComponent', () => {
  let component: ListarMedicoesComponent;
  let fixture: ComponentFixture<ListarMedicoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarMedicoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarMedicoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
