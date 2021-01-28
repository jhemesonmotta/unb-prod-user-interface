import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFatorComponent } from './add-fator.component';

describe('AddFatorComponent', () => {
  let component: AddFatorComponent;
  let fixture: ComponentFixture<AddFatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
