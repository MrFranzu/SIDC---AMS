import { Component, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { Chart, ChartConfiguration, ChartOptions } from "chart.js";
import * as attendeeData from "../../common/json/attendee.json";
import { AttendanceService } from "app/common/services/attendance.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements AfterViewInit {
  totalRegistered!: number;
  totalCheckedIn!: number;
  noShows!: number;
  attendanceRate!: number;
  currentAttendees: number = 390;
  attendees = (attendeeData as any).default;

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

  constructor(private attendanceService: AttendanceService) {}

  ngAfterViewInit(): void {
    this.attendanceService.getAttendees$().subscribe((attendeesMap) => {
      this.attendees = Object.values(attendeesMap);

      this.attendanceLog = this.attendees.map((a: any) => ({
        name: a.name,
        time: this.formatTime(a.checkInTime),
        checkOutTime: this.formatTime(a.checkOutTime),
        status: a.checkInTime ? "Checked-in" : "No-show",

      }));

      this.calculateStatistics();
      this.loadCharts();
    });
  }

  private formatTime(time: string | null): string {
    if (!time) return "";
    return new Date(time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
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
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Ensure high DPI scaling for sharpness
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    ctx.scale(dpr, dpr);

    new Chart(ctx, config);
  }

  private calculateStatistics(): void {
    this.totalRegistered = this.attendees.length;
    this.totalCheckedIn = this.attendees.filter(
      (a: any) => !!a.checkInTime
    ).length;
    this.noShows = this.totalRegistered - this.totalCheckedIn;
    this.attendanceRate = Math.round(
      (this.totalCheckedIn / this.totalRegistered) * 100
    );
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
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              font: {
                size: 14,
              },
            },
          },
          tooltip: {
            bodyFont: {
              size: 14,
            },
            titleFont: {
              size: 16,
            },
          },
        },
        scales: <ChartOptions["scales"]>{
          x: {
            type: "category",
            ticks: {
              font: {
                size: 14,
              },
            },
          },
          y: {
            type: "linear",
            ticks: {
              font: {
                size: 14,
              },
            },
          },
        },
      },
    };
  }

  private getPieChartConfig(): ChartConfiguration {
    return {
      type: "pie",
      data: {
        labels: ["Checked-in", "No-show"],
        datasets: [
          {
            data: [this.totalCheckedIn, this.noShows],
            backgroundColor: ["#24695C", "#B22222"],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
        },
      },
    };
  }

  private getBarChartConfig(): ChartConfiguration {
    return {
      type: "bar",
      data: {
        labels: ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM"],
        datasets: [
          {
            label: "Attendees",
            data: [30, 90, 160, 280, 420, 465],
            backgroundColor: "#24695C",
          },
        ],
      },
      options: {
        responsive: true,
        scales: <ChartOptions["scales"]>{
          y: {
            ticks: {
              font: {
                size: 14,
              },
            },
          },
        },
      },
    };
  }
}
