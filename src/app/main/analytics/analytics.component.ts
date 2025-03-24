import { Component, OnInit } from "@angular/core";
import {
  faUsers,
  faHourglassHalf,
  faCheckCircle,
  faTimesCircle,
  faChartBar,
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-analytics",
  templateUrl: "./analytics.component.html",
  styleUrls: ["./analytics.component.scss"],
})
export class AnalyticsComponent implements OnInit {
  totalRegistered: number = 110;
  totalCheckedIn: number = 99;
  noShowCount!: number;
  attendanceRate!: number;
  averageStayDuration: number = 120;
  faUsers = faUsers;
  faHourglassHalf = faHourglassHalf;
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;
  faChartBar = faChartBar;

  registrationVsAttendance: {
    data: { x: number; y: number }[]; // ✅ Change type to accept objects
    label: string;
    backgroundColor: string[];
    borderColor: string;
    borderWidth: number;
  }[] = [];

  colorScheme = {
    domain: ["#5AA454", "#A10A28", "#C7B42C", "#AAAAAA"],
  };

  chartColors = {
    backgroundColor: ["#24695c50"],
    borderColor: "#24695c",
    pointBackgroundColor: "#24695c",
    pointBorderColor: "#fff",
    hoverBackgroundColor: "#1e5a50",
    hoverBorderColor: "#1e5a50",
  };

  peakCheckInTime: {
    data: number[];
    label: string;
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[] = [];

  checkInTrends: { name: string; series: { name: string; value: number }[] }[] =
    [];

  checkOutTrends: {
    data: number[];
    label: string;
    backgroundColor: string;
    borderColor: string;
    pointBackgroundColor: string;
    pointBorderColor: string;
    fill: boolean;
  }[] = [];

  locationBreakdown: {
    data: number[];
    label: string;
    backgroundColor: string[];
  }[] = [];

  timeLabels: string[] = ["8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM"];
  locationLabels: string[] = ["Location A", "Location B"];

  // Donut Chart Data for Membership Distribution
  membershipBreakdown = [
    {
      data: [70, 30], // Example: 70% SIDC Members, 30% Non-Members
      label: "Membership Distribution",
      backgroundColor: ["#24695c", "#A10A28"], // Green for members, Red for non-members
      hoverBackgroundColor: ["#1e5a50", "#8B0E1C"],
    },
  ];

  // Donut Chart Options
  doughnutChartOptions = {
    responsive: true,
    cutout: "50%", // Creates the "donut" effect
    plugins: {
      legend: { position: "bottom" },
      tooltip: { enabled: true },
    },
  };
  scatterChartOptions: {
    responsive: boolean;
    scales: {
      x: { title: { display: boolean; text: string } };
      y: { title: { display: boolean; text: string } };
    };
  };

  constructor() {}

  ngOnInit(): void {
    // Compute attendance metrics
    this.noShowCount = this.totalRegistered - this.totalCheckedIn;
    this.attendanceRate = parseFloat(
      ((this.totalCheckedIn / this.totalRegistered) * 100).toFixed(2)
    );

    // Initialize other chart data
    this.peakCheckInTime = [
      {
        data: [5, 10, 20, 50, 80, 100],
        label: "Peak Check-in",
        backgroundColor: this.chartColors.backgroundColor[0], // ✅ Fixed
        borderColor: this.chartColors.borderColor,
        borderWidth: 2,
      },
    ];

    this.checkInTrends = [
      {
        name: "Monday",
        series: [
          { name: "8 AM", value: 5 },
          { name: "9 AM", value: 15 },
          { name: "10 AM", value: 30 },
          { name: "11 AM", value: 50 },
          { name: "12 PM", value: 70 },
          { name: "1 PM", value: 90 },
        ],
      },
      {
        name: "Tuesday",
        series: [
          { name: "8 AM", value: 10 },
          { name: "9 AM", value: 25 },
          { name: "10 AM", value: 40 },
          { name: "11 AM", value: 60 },
          { name: "12 PM", value: 85 },
          { name: "1 PM", value: 100 },
        ],
      },
      {
        name: "Wednesday",
        series: [
          { name: "8 AM", value: 8 },
          { name: "9 AM", value: 20 },
          { name: "10 AM", value: 35 },
          { name: "11 AM", value: 55 },
          { name: "12 PM", value: 75 },
          { name: "1 PM", value: 95 },
        ],
      },
      {
        name: "Thursday",
        series: [
          { name: "8 AM", value: 12 },
          { name: "9 AM", value: 28 },
          { name: "10 AM", value: 45 },
          { name: "11 AM", value: 65 },
          { name: "12 PM", value: 88 },
          { name: "1 PM", value: 110 },
        ],
      },
      {
        name: "Friday",
        series: [
          { name: "8 AM", value: 9 },
          { name: "9 AM", value: 22 },
          { name: "10 AM", value: 38 },
          { name: "11 AM", value: 58 },
          { name: "12 PM", value: 80 },
          { name: "1 PM", value: 100 },
        ],
      },
    ];

    this.checkOutTrends = [
      {
        data: [5, 15, 25, 40, 70, 90],
        label: "Check-outs",
        backgroundColor: this.chartColors.backgroundColor[0], // ✅ Fixed
        borderColor: this.chartColors.borderColor,
        pointBackgroundColor: this.chartColors.pointBackgroundColor,
        pointBorderColor: this.chartColors.pointBorderColor,
        fill: true,
      },
    ];

    // // Function to generate random registration and attendance data
    const generateRandomData = (numPoints: number) => {
      let data = [];
      for (let i = 0; i < numPoints; i++) {
        let totalRegistered = Math.floor(Math.random() * (500 - 50) + 50); // Between 50 and 500
        let totalCheckedIn = Math.floor(
          totalRegistered * (Math.random() * (1 - 0.4) + 0.4)
        ); // 40% - 100% check-in rate
        data.push({ x: totalRegistered, y: totalCheckedIn });
      }
      return data;
    };

    this.registrationVsAttendance = [
      {
        label: "Registration vs. Attendance",
        data: generateRandomData(200), // Generate 200+ points
        backgroundColor: ["rgba(36, 105, 92, 0.5)"], // Semi-transparent green
        borderColor: "#24695c",
        borderWidth: 1,
      },
    ];

    this.scatterChartOptions = {
      responsive: true,
      scales: {
        x: { title: { display: true, text: "Total Registered" } },
        y: { title: { display: true, text: "Total Checked-in" } },
      },
    };

    this.locationBreakdown = [
      {
        data: [60, 40],
        label: "Location",
        backgroundColor: ["#24695c", "#1e5a50"],
      },
    ];
  }
}
