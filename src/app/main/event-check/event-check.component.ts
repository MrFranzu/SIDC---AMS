import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
} from "@angular/core";
import { debounceTime } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";
import { AttendanceService } from "app/common/services/attendance.service";
import { BarcodeFormat } from '@zxing/library';

interface Attendee {
  code: string;
  name: string;
  checkInTime?: string | null;
  checkOutTime?: string | null;
}

@Component({
  selector: "app-event-check",
  templateUrl: "./event-check.component.html",
  styleUrls: ["./event-check.component.scss"],
})
export class EventCheckComponent implements OnInit, AfterViewInit {
  scannedCode: string = "";
  manualCode: string = "";
  message: string = "";
  attendees: Record<string, Attendee> = {};
  isCheckInMode: boolean = true;
  scanSubject = new BehaviorSubject<string>("");
  formatsEnabled: BarcodeFormat[] = [BarcodeFormat.QR_CODE];

  attendanceLog: any[] = []; // Add appropriate type
  // Add actual implementations for calculateStatistics and loadCharts
  calculateStatistics() {}
  loadCharts() {}

  @ViewChild("manualInput") manualInput!: ElementRef;

  constructor(private attendanceService: AttendanceService) {}

  ngOnInit(): void {
    this.initializeScanner();
  }

  ngAfterViewInit(): void {
    this.attendanceService.getAttendees$().subscribe((attendeesMap) => {
      this.attendees = attendeesMap;
      const attendees = Object.values(attendeesMap);

      this.attendanceLog = attendees.map((a) => ({
        name: a.name,
        time: a.checkInTime ?? null,
        checkOutTime: a.checkOutTime ?? null,
        status: a.checkInTime ? "Checked-in" : "No-show",
      }));

      this.calculateStatistics();
      this.loadCharts();
    });
  }

  /** Loads attendee data from service */
  private loadAttendees(): void {
    const localData = localStorage.getItem("attendees");
    if (localData) {
      this.attendees = JSON.parse(localData);
    } else {
      this.attendees = this.attendanceService.getAttendeesSnapshot();
    }
  }

  /** Converts array to a key-value record */
  private convertAttendees(data: Attendee[]): Record<string, Attendee> {
    return data.reduce((acc, attendee) => {
      acc[attendee.code.toUpperCase()] = {
        ...attendee,
        checkInTime: attendee.checkInTime || null,
        checkOutTime: attendee.checkOutTime || null,
      };
      return acc;
    }, {} as Record<string, Attendee>);
  }

  /** Initializes QR scanner */
  private initializeScanner(): void {
    this.scanSubject.pipe(debounceTime(300)).subscribe((code) => {
      if (code) {
        console.log("Processed QR Code:", code);
        this.processCode(code.trim().toUpperCase());
      }
    });
  }

  /** Toggle Check-In/Out Mode */
  toggleMode(): void {
    this.isCheckInMode = !this.isCheckInMode;
    this.setMessage(
      this.isCheckInMode
        ? "✅ Switched to Check-In Mode"
        : "👋 Switched to Check-Out Mode"
    );
    this.focusManualInput();
  }

  /** QR Scan Handler */
  onQrScan(result: string): void {
    const code = result.trim().toUpperCase();
    if (code) {
      this.scanSubject.next(code);
    }
  }

  /** Manual Entry Handler */
  manualCheck(): void {
    console.log("Manual Entry Detected:", this.manualCode);
    this.processCode(this.manualCode.trim().toUpperCase());
  }

  /** Main Code Processing */
  private processCode(code: string): void {
    this.scannedCode = code;

    const attendee = this.attendees[code];
    if (!attendee) {
      this.playSound(false);
      this.setMessage("❌ Invalid Code. Please try again.");
      return;
    }

    const currentTime = this.getCurrentTime();

    if (this.isCheckInMode) {
      this.handleCheckIn(attendee, currentTime);
    } else {
      this.handleCheckOut(attendee, currentTime);
    }

    this.attendanceService.updateAttendee(code, attendee);
    this.updateAttendanceLog(); // ✅ Add this

    this.resetInputs();
  }

  /** Check-In Logic */
  private handleCheckIn(attendee: Attendee, time: string): void {
    if (!attendee.checkInTime) {
      attendee.checkInTime = time;
      this.playSound(true);
      this.setMessage(`✅ Welcome ${attendee.name}! Checked in at ${time}.`);
    } else {
      const formatted = new Date(attendee.checkInTime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      this.setMessage(
        `⚠️ ${attendee.name} already checked in at ${formatted}.`
      );
    }
  }

  /** Check-Out Logic */
  private handleCheckOut(attendee: Attendee, time: string): void {
    if (!attendee.checkInTime) {
      this.setMessage(`⚠️ ${attendee.name} has not checked in yet.`);
    } else if (!attendee.checkOutTime) {
      attendee.checkOutTime = time;
      this.playSound(true);
      this.setMessage(`👋 Goodbye ${attendee.name}! Checked out at ${time}.`);
    } else {
      const formatted = new Date(attendee.checkInTime).toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      this.setMessage(
        `⚠️ ${attendee.name} already checked out at ${formatted}.`
      );
    }
  }

  /** Display message briefly */
  private setMessage(msg: string): void {
    this.message = msg;
    console.log("Message:", msg);
    setTimeout(() => (this.message = ""), 2000);
  }

  /** Play sound feedback */
  private playSound(success: boolean): void {
    // Uncomment if needed
    // const audio = new Audio(`assets/${success ? "right.mp3" : "wrong.mp3"}`);
    // audio.play().catch(err => console.log("Audio play error:", err));
  }

  /** Reset form */
  private resetInputs(): void {
    setTimeout(() => {
      this.scannedCode = "";
      this.manualCode = "";
      this.focusManualInput();
    }, 1000);
  }

  /** Focus manual input */
  private focusManualInput(): void {
    setTimeout(() => {
      this.manualInput?.nativeElement?.focus();
    }, 200);
  }

  /** Get current time */
  private getCurrentTime(): string {
    return new Date().toISOString();
  }
  private formatTime(time: string | null): string {
    if (!time) return "";
    return new Date(time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  private updateAttendanceLog(): void {
    const attendees = Object.values(this.attendees);
    this.attendanceLog = attendees.map((a) => {
      let status = "No-show";
      if (a.checkInTime && !a.checkOutTime) status = "Checked-in";
      else if (a.checkInTime && a.checkOutTime) status = "Checked-out";

      return {
        name: a.name,
        time: this.formatTime(a.checkInTime),
        checkOutTime: this.formatTime(a.checkOutTime),
        status,
      };
    });
  }
}
