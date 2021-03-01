import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatComponent } from './templat.component';

describe('TemplatComponent', () => {
  let component: TemplatComponent;
  let fixture: ComponentFixture<TemplatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
