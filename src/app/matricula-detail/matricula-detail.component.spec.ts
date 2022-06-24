import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatriculaDetailComponent } from './matricula-detail.component';

describe('MatriculaDetailComponent', () => {
  let component: MatriculaDetailComponent;
  let fixture: ComponentFixture<MatriculaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatriculaDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatriculaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
