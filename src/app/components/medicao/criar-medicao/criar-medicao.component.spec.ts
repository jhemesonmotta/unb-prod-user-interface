import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarMedicaoComponent } from './criar-medicao.component';

describe('CriarMedicaoComponent', () => {
  let component: CriarMedicaoComponent;
  let fixture: ComponentFixture<CriarMedicaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriarMedicaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarMedicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
