import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PecasComputadorComponent } from './pecas-computador.component';

describe('PecasComputadorComponent', () => {
  let component: PecasComputadorComponent;
  let fixture: ComponentFixture<PecasComputadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PecasComputadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PecasComputadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
