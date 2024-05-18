import { Component, Input, OnInit, input } from '@angular/core';
import { MeasurementCollection } from '../../shared/models/measurement-collection.interface';

@Component({
  selector: 'app-measurement-display',
  standalone: true,
  imports: [],
  templateUrl: './measurement-display.component.html',
  styleUrl: './measurement-display.component.css'
})
export class MeasurementDisplayComponent implements OnInit{
 @Input() public dataCollection: MeasurementCollection  = {
    isFetching: false,
    measurements: []
  };

  ngOnInit() {

  }
}
