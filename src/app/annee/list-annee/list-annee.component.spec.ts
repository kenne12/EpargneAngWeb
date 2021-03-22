import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAnneeComponent } from './list-annee.component';

describe('ListAnneeComponent', () => {
  let component: ListAnneeComponent;
  let fixture: ComponentFixture<ListAnneeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAnneeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAnneeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
