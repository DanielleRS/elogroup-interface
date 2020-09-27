import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDataComponent } from './modal-data.component';

describe('ModalDataComponent', () => {
  let component: ModalDataComponent;
  let fixture: ComponentFixture<ModalDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
