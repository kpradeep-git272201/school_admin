import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatebugComponent } from './createbug.component';

describe('CreatebugComponent', () => {
  let component: CreatebugComponent;
  let fixture: ComponentFixture<CreatebugComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatebugComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatebugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
