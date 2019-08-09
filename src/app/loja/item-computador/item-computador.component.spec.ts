import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemComputadorComponent } from './item-computador.component';

describe('ItemComputadorComponent', () => {
  let component: ItemComputadorComponent;
  let fixture: ComponentFixture<ItemComputadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemComputadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemComputadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
