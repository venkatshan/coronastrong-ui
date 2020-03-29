import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoronaClusterCountComponent } from './corona-cluster-count.component';

describe('CoronaClusterCountComponent', () => {
  let component: CoronaClusterCountComponent;
  let fixture: ComponentFixture<CoronaClusterCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoronaClusterCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoronaClusterCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
