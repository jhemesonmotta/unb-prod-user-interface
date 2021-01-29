import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarConfiguracoesComponent } from './listar-configuracoes.component';

describe('ListarConfiguracoesComponent', () => {
  let component: ListarConfiguracoesComponent;
  let fixture: ComponentFixture<ListarConfiguracoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarConfiguracoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarConfiguracoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
