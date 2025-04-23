// src/app/services/attendance.service.ts
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import attendeeData from "../../common/json/attendee.json";

export interface Attendee {
  code: string;
  name: string;
  checkInTime?: string | null;
  checkOutTime?: string | null;
}

@Injectable({
  providedIn: "root",
})
export class AttendanceService {
  private attendees: Record<string, Attendee> = {};
  private attendeesSubject = new BehaviorSubject<Record<string, Attendee>>({});

  constructor() {
    const saved = localStorage.getItem("attendees");
    if (saved) {
      this.attendees = JSON.parse(saved);
    } else {
      this.attendees = this.convertData(attendeeData);
    }
  
    Object.values(this.attendees).forEach((a) => {
      a.checkInTime = null;
      a.checkOutTime = null;
    });
  
    this.save(); 
    this.attendeesSubject.next(this.attendees);
  }
  

  private convertData(data: Attendee[]): Record<string, Attendee> {
    return data.reduce((acc, attendee) => {
      acc[attendee.code.toUpperCase()] = {
        ...attendee,
        checkInTime: attendee.checkInTime || null,
        checkOutTime: attendee.checkOutTime || null,
      };
      return acc;
    }, {} as Record<string, Attendee>);
  }

  getAttendees$() {
    return this.attendeesSubject.asObservable();
  }

  getAttendeesSnapshot() {
    return this.attendees;
  }

  updateAttendee(code: string, update: Partial<Attendee>) {
    const attendee = this.attendees[code];
    if (!attendee) return;

    this.attendees[code] = { ...attendee, ...update };
    this.save();
  }

  private save() {
    localStorage.setItem("attendees", JSON.stringify(this.attendees));
    this.attendeesSubject.next(this.attendees);
  }
}
