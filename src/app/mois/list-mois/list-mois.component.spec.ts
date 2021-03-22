import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMoisComponent } from './list-mois.component';

describe('ListMoisComponent', () => {
  let component: ListMoisComponent;
  let fixture: ComponentFixture<ListMoisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMoisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMoisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
