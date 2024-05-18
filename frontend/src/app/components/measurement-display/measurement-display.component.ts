import { Component, Input, OnInit, Signal, computed, input, signal } from '@angular/core';
import { MeasurementCollection } from '../../shared/models/measurement-collection.interface';

@Component({
  selector: 'app-measurement-display',
  standalone: true,
  imports: [],
  templateUrl: './measurement-display.component.html',
  styleUrl: './measurement-display.component.css'
})
export class MeasurementDisplayComponent implements OnInit {
  // public dataCollection: MeasurementCollection = {
  //   isFetching: false,
  //   measurements: []
  // };
  //
  dataCollection = input.required<MeasurementCollection>()
  avg = computed(() => {
    return this.dataCollection().measurements.reduce((acc, current) => {
      return acc + current.value;
    }, 0) / this.dataCollection().measurements.length
  })
  min = computed(() => {
    return Math.min(...this.dataCollection().measurements.map(measurement => measurement.value));
  });
  max = computed(() => {
    return Math.max(...this.dataCollection().measurements.map(measurement => measurement.value));
  });
  ngOnInit() {
  }
}
