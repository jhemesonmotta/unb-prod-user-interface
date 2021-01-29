import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConfiguracaoComponent } from './add-configuracao.component';

describe('AddConfiguracaoComponent', () => {
  let component: AddConfiguracaoComponent;
  let fixture: ComponentFixture<AddConfiguracaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddConfiguracaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddConfiguracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
