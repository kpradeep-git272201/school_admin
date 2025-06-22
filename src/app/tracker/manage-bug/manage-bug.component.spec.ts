import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBugComponent } from './manage-bug.component';

describe('ManageBugComponent', () => {
  let component: ManageBugComponent;
  let fixture: ComponentFixture<ManageBugComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageBugComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageBugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
