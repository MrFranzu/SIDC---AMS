import { Component, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { Chart, ChartConfiguration } from "chart.js";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements AfterViewInit {
  readonly totalRegistered: number = 550;
  readonly totalCheckedIn: number = 465;
  noShows!: number;
  attendanceRate!: number;
  currentAttendees: number = 390;

  attendanceLog = [
    { name: "Alice Johnson", time: "9:10 AM", status: "Checked-in" },
    { name: "John Doe", time: "9:45 AM", status: "Checked-in" },
    { name: "Emma Wilson", time: "10:05 AM", status: "Checked-in" },
    { name: "Michael Brown", time: "10:30 AM", status: "No-show" },
    { name: "Sophia Lee", time: "11:00 AM", status: "Checked-in" },
    { name: "Daniel Martinez", time: "11:20 AM", status: "Checked-in" },
    { name: "Olivia Taylor", time: "12:15 PM", status: "Checked-in" },
  ];

  @ViewChild("lineChart") lineChartRef!: ElementRef;
  @ViewChild("pieChart") pieChartRef!: ElementRef;
  @ViewChild("barChart") barChartRef!: ElementRef;

  constructor() {}

  ngAfterViewInit(): void {
    this.calculateStatistics();
    this.loadCharts();
  }

  private calculateStatistics(): void {
    this.noShows = this.totalRegistered - this.totalCheckedIn;
    this.attendanceRate = Math.round(
      (this.totalCheckedIn / this.totalRegistered) * 100
    );
  }

  private loadCharts(): void {
    this.createChart(
      this.lineChartRef.nativeElement,
      this.getLineChartConfig()
    );
    this.createChart(this.pieChartRef.nativeElement, this.getPieChartConfig());
    this.createChart(this.barChartRef.nativeElement, this.getBarChartConfig());
  }

  private createChart(
    canvas: HTMLCanvasElement,
    config: ChartConfiguration
  ): void {
    new Chart(canvas, config);
  }

  private getLineChartConfig(): ChartConfiguration {
    return {
      type: "line",
      data: {
        labels: ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM"],
        datasets: [
          {
            label: "Check-ins",
            data: [30, 90, 160, 280, 420, 465],
            borderColor: "#24695C",
            backgroundColor: "#24695C33",
            fill: true,
          },
          {
            label: "Check-outs",
            data: [0, 10, 40, 80, 120, 160],
            borderColor: "#B22222",
            backgroundColor: "#B2222233",
            fill: true,
          },
        ],
      },
    };
  }

  private getPieChartConfig(): ChartConfiguration {
    return {
      type: "pie",
      data: {
        labels: ["SIDC Members", "Non-SIDC Members"],
        datasets: [
          {
            data: [320, 230],
            backgroundColor: ["#24695C", "#1b5246"],
          },
        ],
      },
    };
  }

  private getBarChartConfig(): ChartConfiguration {
    return {
      type: "bar",
      data: {
        labels: ["Hall A", "Hall B", "Hall C"],
        datasets: [
          {
            label: "Attendees",
            data: [110, 120, 99],
            backgroundColor: ["#24695C", "#1b5246", "#368675"],
          },
        ],
      },
    };
  }
}
