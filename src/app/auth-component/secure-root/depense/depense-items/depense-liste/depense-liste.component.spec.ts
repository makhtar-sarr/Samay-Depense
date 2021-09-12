/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DepenseListeComponent } from './depense-liste.component';

describe('DepenseListeComponent', () => {
  let component: DepenseListeComponent;
  let fixture: ComponentFixture<DepenseListeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepenseListeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepenseListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
