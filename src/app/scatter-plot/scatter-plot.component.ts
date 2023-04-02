import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { DataService } from '../DataService';
@Component({
    selector: 'pm-scatter-plot',
    templateUrl: './scatter-plot.component.html',
  })

  export class ScatterComponent implements OnInit{
    private svg: any;
    private margin = 50;
    private width = 750 - (this.margin * 2);
    private height = 400 - (this.margin * 2);
    constructor(private dataService: DataService) { }
    ngOnInit(): void {
        this.createSvg();
          this.dataService.getAllDataPoints().subscribe(data => {
            const chartData = data as ChartDataType[];
            this.drawPlot(chartData);
          });
    }
    private createSvg(): void {
        this.svg = d3.select("figure#scatter")
        .append("svg")
        .attr("width", this.width + (this.margin * 2))
        .attr("height", this.height + (this.margin * 2))
        .append("g")
        .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
    }
    private drawPlot(data: ChartDataType[]): void {
        // Add X axis
        const x = d3.scaleLinear()
        .domain([0, 20])
        .range([ 0, this.width ]);
        this.svg.append("g")
        .attr("transform", "translate(0," + this.height + ")")
        .call(d3.axisBottom(x).tickFormat(d3.format("d")));
    
        // Add Y axis
        const y = d3.scaleLinear()
        .domain([0, 200000])
        .range([ this.height, 0]);
        this.svg.append("g")
        .call(d3.axisLeft(y));
    
        // Add dots
        const dots = this.svg.append('g');
        dots.selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", (d: any) => x(d.xDirection))
        .attr("cy",  (d: any) => y(d.yDirection))
        .attr("r", 7)
        .style("opacity", .5)
        .style("fill", "#69b3a2");
    
    }
  }

  export interface ChartDataType{
    id: number
    xDirection: number,
    yDirection: number
  }