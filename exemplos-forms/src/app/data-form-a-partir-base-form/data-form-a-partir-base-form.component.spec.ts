import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataFormAPartirBaseFormComponent } from './data-form-a-partir-base-form.component';

describe('DataFormAPartirBaseFormComponent', () => {
  let component: DataFormAPartirBaseFormComponent;
  let fixture: ComponentFixture<DataFormAPartirBaseFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataFormAPartirBaseFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataFormAPartirBaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
