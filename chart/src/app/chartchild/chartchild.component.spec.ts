import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartchildComponent } from './chartchild.component';

describe('ChartchildComponent', () => {
  let component: ChartchildComponent;
  let fixture: ComponentFixture<ChartchildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartchildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartchildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
