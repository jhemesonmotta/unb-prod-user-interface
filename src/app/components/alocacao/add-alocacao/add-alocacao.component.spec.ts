import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAlocacaoComponent } from './add-alocacao.component';

describe('AddAlocacaoComponent', () => {
  let component: AddAlocacaoComponent;
  let fixture: ComponentFixture<AddAlocacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAlocacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAlocacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
