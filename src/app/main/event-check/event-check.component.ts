import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
} from "@angular/core";
import { debounceTime } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";
import attendeeData from "../../common/json/attendee.json";

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

  @ViewChild("manualInput") manualInput!: ElementRef;

  constructor() {}

  ngOnInit(): void {
    this.loadAttendees();
    this.initializeScanner();
  }

  ngAfterViewInit(): void {
    this.focusManualInput();
  }

  /** Loads attendee data from localStorage or JSON file */
  private loadAttendees(): void {
    const savedData = localStorage.getItem("attendees");
    this.attendees = savedData
      ? JSON.parse(savedData)
      : this.convertAttendees(attendeeData);
  }

  /** Converts raw JSON attendee data to a key-value record */
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

  /** Initializes QR scanner with debounce to prevent duplicate scans */
  private initializeScanner(): void {
    this.scanSubject.pipe(debounceTime(300)).subscribe((code) => {
      if (code) {
        console.log("Processed QR Code:", code);
        this.processCode(code.trim().toUpperCase());
      }
    });
  }

  /** Toggles between Check-In and Check-Out modes */
  toggleMode(): void {
    this.isCheckInMode = !this.isCheckInMode;
    this.setMessage(
      this.isCheckInMode
        ? "✅ Switched to Check-In Mode"
        : "👋 Switched to Check-Out Mode"
    );

    this.focusManualInput();
  }

  /** Handles QR scan input */
  onQrScan(result: string): void {
    console.log("QR Scan Event Triggered:", result);
    if (result && result !== this.scannedCode) {
      console.log("QR Scan Detected:", result);
      this.scanSubject.next(result.trim().toUpperCase());
    } else {
      console.warn("Duplicate or Empty Scan Ignored");
    }
  }

  /** Handles manual code entry */
  manualCheck(): void {
    console.log("Manual Entry Detected:", this.manualCode);
    this.processCode(this.manualCode.trim().toUpperCase());
  }

  /** Processes the scanned or manually entered code */
  private processCode(code: string): void {
    this.scannedCode = code;

    if (!this.attendees[code]) {
      this.playSound(false);
      this.setMessage("❌ Invalid Code. Please try again.");
      return;
    }

    const attendee = this.attendees[code];
    console.log("Scanned Attendee Data:", attendee);

    const currentTime = this.getCurrentTime();

    this.isCheckInMode
      ? this.handleCheckIn(attendee, currentTime)
      : this.handleCheckOut(attendee, currentTime);

    this.saveDataToLocalStorage();
    this.resetInputs();
  }

  /** Handles check-in process */
  private handleCheckIn(attendee: Attendee, time: string): void {
    if (!attendee.checkInTime) {
      attendee.checkInTime = time;
      this.playSound(true);
      this.setMessage(`✅ Welcome ${attendee.name}! Checked in at ${time}.`);
    } else {
      this.setMessage(
        `⚠️ ${attendee.name} already checked in at ${attendee.checkInTime}.`
      );
    }
  }

  /** Handles check-out process */
  private handleCheckOut(attendee: Attendee, time: string): void {
    if (!attendee.checkInTime) {
      this.setMessage(
        `⚠️ ${attendee.name} has not checked in yet. Please check-in first.`
      );
    } else if (!attendee.checkOutTime) {
      attendee.checkOutTime = time;
      this.playSound(true);
      this.setMessage(`👋 Goodbye ${attendee.name}! Checked out at ${time}.`);
    } else {
      this.setMessage(
        `⚠️ ${attendee.name} already checked out at ${attendee.checkOutTime}.`
      );
    }
  }

  /** Sets message with a timeout */
  private setMessage(msg: string): void {
    this.message = msg;
    console.log("Message:", msg);
    setTimeout(() => (this.message = ""), 2000);
  }

  /** Saves updated attendee data to localStorage */
  private saveDataToLocalStorage(): void {
    localStorage.setItem("attendees", JSON.stringify(this.attendees));
  }

  /** Plays success/failure sound */
  private playSound(success: boolean): void {
    // const audio = new Audio(`assets/${success ? "right.mp3" : "wrong.mp3"}`);
    // audio.play().catch(error => console.log("Audio play error:", error));
  }

  /** Clears input fields and refocuses manual input */
  private resetInputs(): void {
    setTimeout(() => {
      this.scannedCode = "";
      this.manualCode = "";
      this.focusManualInput();
    }, 1000);
  }

  /** Focuses manual input field */
  private focusManualInput(): void {
    setTimeout(() => {
      if (this.manualInput) {
        this.manualInput.nativeElement.focus();
      } else {
        console.warn("Manual input field is not available.");
      }
    }, 200);
  }

  /** Returns current formatted time */
  private getCurrentTime(): string {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
}
