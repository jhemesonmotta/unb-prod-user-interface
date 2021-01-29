import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerMedicaoComponent } from './ver-medicao.component';

describe('VerMedicaoComponent', () => {
  let component: VerMedicaoComponent;
  let fixture: ComponentFixture<VerMedicaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerMedicaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerMedicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
