import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaTrofeusComponent } from './sala-trofeus.component';

describe('SalaTrofeusComponent', () => {
  let component: SalaTrofeusComponent;
  let fixture: ComponentFixture<SalaTrofeusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaTrofeusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaTrofeusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
