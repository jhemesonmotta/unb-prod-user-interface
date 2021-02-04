import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesteCorsComponent } from './teste-cors.component';

describe('TesteCorsComponent', () => {
  let component: TesteCorsComponent;
  let fixture: ComponentFixture<TesteCorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TesteCorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TesteCorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
