import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConfiguracaoComponent } from './edit-configuracao.component';

describe('EditConfiguracaoComponent', () => {
  let component: EditConfiguracaoComponent;
  let fixture: ComponentFixture<EditConfiguracaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditConfiguracaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditConfiguracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
