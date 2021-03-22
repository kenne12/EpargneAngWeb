import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMoisComponent } from './add-mois.component';

describe('AddMoisComponent', () => {
  let component: AddMoisComponent;
  let fixture: ComponentFixture<AddMoisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMoisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMoisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
