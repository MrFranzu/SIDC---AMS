import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCheckComponent } from './event-check.component';

describe('EventCheckComponent', () => {
  let component: EventCheckComponent;
  let fixture: ComponentFixture<EventCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventCheckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
