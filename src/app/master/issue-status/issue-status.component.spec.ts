import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueStatusComponent } from './issue-status.component';

describe('IssueStatusComponent', () => {
  let component: IssueStatusComponent;
  let fixture: ComponentFixture<IssueStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssueStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssueStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
