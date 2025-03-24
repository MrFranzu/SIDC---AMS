import { Component, ChangeDetectorRef } from "@angular/core";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import * as QRCode from "qrcode";
import * as attendeeData from "../../common/json/attendee.json";


interface Attendee {
  name: string;
  address: string;
  phone: string;
  email: string;
  code: string;
  qrCode?: string; // Store the generated QR code URL
  checkInTime?: string;
  checkOutTime?: string;
}

@Component({
  selector: "app-attendance",
  templateUrl: "./attendance.component.html",
  styleUrls: ["./attendance.component.scss"],
})
export class AttendanceComponent {
  searchQuery: string = "";
  selectedMembership: string = "";
  selectedStatus: string = "";

  public attendanceList: Attendee[] =
    (attendeeData as any).default || attendeeData;

  filteredAttendance: Attendee[] = [...this.attendanceList];

  selectedQRCode: string | null = null;
  selectedAttendee: Attendee | null = null;

  constructor(private cdr: ChangeDetectorRef) {
    this.generateQRCodes();
  }

  applyFilters() {
    this.filteredAttendance = this.attendanceList
      .filter((attendee) => {
        return (
          (this.searchQuery === "" ||
            attendee.name
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase()) ||
            attendee.code
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase())) &&
          (this.selectedMembership === "" ||
            (this.selectedMembership === "SIDC" &&
              attendee.code.startsWith("SIDC")) ||
            (this.selectedMembership === "Non-SIDC" &&
              !attendee.code.startsWith("SIDC"))) &&
          (this.selectedStatus === "" ||
            (this.selectedStatus === "Checked-in" && attendee.checkInTime) ||
            (this.selectedStatus === "No-show" && !attendee.checkInTime))
        );
      })
      .sort(() => Math.random() - 0.5);
  }

  manualCheckIn(attendee: Attendee) {
    attendee.checkInTime = new Date().toLocaleTimeString();
  }

  manualCheckOut(attendee: Attendee) {
    attendee.checkOutTime = new Date().toLocaleTimeString();
  }

  resendQRCode(attendee: Attendee) {
    alert(`QR Code resent to ${attendee.email}`);
  }

  async generateQRCodes() {
    for (const attendee of this.attendanceList) {
      if (!attendee.qrCode) {
        attendee.qrCode = await this.createQRCode(attendee.code);
      }
    }
  }

  createQRCode(code: string): Promise<string> {
    return new Promise((resolve, reject) => {
      QRCode.toDataURL(code, { errorCorrectionLevel: "H" }, (err, url) => {
        if (err) {
          console.error("QR Code Generation Failed:", err);
          reject(err);
        } else {
          console.log("Generated QR Code:", url);
          resolve(url);
        }
      });
    });
  }

  showQRCode(attendee: Attendee) {
    if (!attendee.qrCode) {
      // Generate QR code if not already available
      this.createQRCode(attendee.code)
        .then((qrCode) => {
          attendee.qrCode = qrCode;
          this.selectedAttendee = attendee;
          this.selectedQRCode = qrCode;

          console.log("QR Code Modal Opened:", this.selectedQRCode);

          this.cdr.detectChanges(); // ✅ Force UI update
        })
        .catch((err) => {
          console.error("QR Code Generation Error:", err);
        });
    } else {
      this.selectedAttendee = attendee;
      this.selectedQRCode = attendee.qrCode;

      console.log("QR Code Modal Opened:", this.selectedQRCode);

      this.cdr.detectChanges(); // ✅ Force UI update
    }
  }

  //  Function to close the QR code modal
  closeQRCode() {
    this.selectedQRCode = null;
    this.selectedAttendee = null;
    this.cdr.detectChanges(); // Ensure UI updates when closing the modal
  }

  downloadReport(format: string) {
    const data = this.filteredAttendance.map(
      ({ name, address, phone, email, code, checkInTime, checkOutTime }) => ({
        Name: name,
        Address: address,
        Phone: phone,
        Email: email,
        Code: code,
        "Check-In Time": checkInTime || "N/A",
        "Check-Out Time": checkOutTime || "N/A",
      })
    );

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance Report");

    if (format === "csv") {
      const csvData = XLSX.utils.sheet_to_csv(worksheet);
      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
      saveAs(blob, "attendance_report.csv");
    } else if (format === "xlsx") {
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "attendance_report.xlsx");
    } else if (format === "pdf") {
      alert("PDF export functionality will be added soon!");
    }
  }
}
