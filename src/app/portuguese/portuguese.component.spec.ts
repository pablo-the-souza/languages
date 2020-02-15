import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortugueseComponent } from './portuguese.component';

describe('PortugueseComponent', () => {
  let component: PortugueseComponent;
  let fixture: ComponentFixture<PortugueseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortugueseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortugueseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
