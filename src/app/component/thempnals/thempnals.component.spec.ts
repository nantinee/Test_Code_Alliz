import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThempnalsComponent } from './thempnals.component';

describe('ThempnalsComponent', () => {
  let component: ThempnalsComponent;
  let fixture: ComponentFixture<ThempnalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThempnalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThempnalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
