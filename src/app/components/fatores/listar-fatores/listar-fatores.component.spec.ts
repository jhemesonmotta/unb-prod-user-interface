import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarFatoresComponent } from './listar-fatores.component';

describe('ListarFatoresComponent', () => {
  let component: ListarFatoresComponent;
  let fixture: ComponentFixture<ListarFatoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarFatoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarFatoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
