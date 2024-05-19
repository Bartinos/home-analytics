import { AfterViewInit, Component, ElementRef, Input, OnInit, Signal, ViewChild, computed, effect, input, signal } from '@angular/core';
import { MeasurementCollection } from '../../shared/models/measurement-collection.interface';
import * as d3 from 'd3';
import { CommonModule } from '@angular/common';
import { Measurement } from '../../shared/models/measurement.interface';

@Component({
  selector: 'app-measurement-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './measurement-display.component.html',
  styleUrl: './measurement-display.component.css'
})
export class MeasurementDisplayComponent implements OnInit, AfterViewInit {
  @ViewChild("graph") graph!: ElementRef;
  dataCollection = input.required<MeasurementCollection>()
  svg: any;

  drawGraphEffect = effect(() => {
    this.drawGraph()
  })

  avg = computed(() => {
    const sum = this.dataCollection().measurements.reduce((acc, current) => acc + current.value, 0);
    return (sum / this.dataCollection().measurements.length).toFixed(2);
  })
  min = computed(() => {
    return Math.min(...this.dataCollection().measurements.map(measurement => measurement.value)).toFixed(2);
  });
  max = computed(() => {
    return Math.max(...this.dataCollection().measurements.map(measurement => measurement.value)).toFixed(2);
  });
  current = computed(() => {
    if(this.dataCollection().measurements.length > 0) return this.dataCollection().measurements[0].value.toFixed(2)
    return "0";
  })

  margin = { top: 70, right: 30, bottom: 40, left: 80 };
  width = 300 - this.margin.left - this.margin.right;
  height = 500 - this.margin.top - this.margin.bottom;
  xScale = d3.scaleTime().range([0, this.width])
  yScale = d3.scaleLinear().range([this.height, 0])

  // constructor() {
  //
  //   this.xScale.domain(d3.extent(this.dataset, d => d.date));
  // }
  ngOnInit() {

    // this.drawAxes()
  }

  private drawGraph() {
    if (!this.graph) {
      console.log("Graph undefined")
      return
      // } else if(this.dataCollection() && !d3.select(this.graph.nativeElement).select('svg')) {
    } else if (this.dataCollection().measurements.length > 0 && !this.svg) {
      console.log("No svg found, initializing graph")
      this.initGraph()
      return
    } else if (this.dataCollection().measurements.length > 0 && this.svg) {
      console.log("Triggering update")
      this.updateGraph()
      return
    }
  }

  private initGraph() {
    this.xScale.domain(d3.extent(this.dataCollection().measurements, d => d.createdAt) as [Date, Date]);
    // const minValue: number = d3.min(this.dataCollection().measurements, d => d.value) as number;
    // const maxValue: number = d3.max(this.dataCollection().measurements, d => d.value) as number;
    // const difValue: number = maxValue - minValue;
    // const minY: number =  minValue - (0.20 * difValue)
    // const maxY: number = maxValue + (0.20 * difValue)
    this.yScale.domain([d3.min(this.dataCollection().measurements, d => d.value),
    d3.max(this.dataCollection().measurements, d => d.value)
    ] as [number, number]);
    // console.log(d3.max(this.dataCollection().measurements, d => d.value))
    this.svg = d3.select(this.graph.nativeElement)
      .append("svg")
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom)
      .append("g")
      .attr("transform", `translate(${this.margin.left},${this.margin.top})`);

    this.svg.append('g').attr('transform', `translate(${this.margin.left},${this.margin.top})`);
    this.svg.append('g')
      .attr("transform", `translate(0,${this.height})`)
      .call(d3.axisBottom<Date>(this.xScale)
        .ticks(d3.timeHour.every(1))
        .tickFormat(d3.timeFormat("%H")));

    this.svg.append('g')
      .call(d3.axisLeft<number>(this.yScale));

    this.updateGraph()
  }

  private updateGraph() {

    const line = d3.line<Measurement>()
      .x((d: Measurement) => this.xScale(d.createdAt))
      .y((d: Measurement) => this.yScale(d.value));
    // this.svg.select('path').attr("d", line);
    // this.svg.delete('path')
    this.svg.append('path').datum(this.dataCollection().measurements)
      .attr("fill", "none")
      .attr("stroke", "rgba(80, 78, 57, 1)")
      .attr("stroke-width", 1)
      .attr("d", line);

  }

  ngOnChanges() {
  }

  ngAfterViewInit() {
    this.drawGraph()
  }
}
