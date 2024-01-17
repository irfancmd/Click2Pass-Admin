import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionSetFormComponent } from './question-set-form.component';

describe('QuestionSetFormComponent', () => {
  let component: QuestionSetFormComponent;
  let fixture: ComponentFixture<QuestionSetFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionSetFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionSetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
