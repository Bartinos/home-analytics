import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementDisplayComponent } from './measurement-display.component';

describe('MeasurementDisplayComponent', () => {
  let component: MeasurementDisplayComponent;
  let fixture: ComponentFixture<MeasurementDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeasurementDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeasurementDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
