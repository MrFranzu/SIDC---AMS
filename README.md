# QR Attendance System 

---

![SIDC-AMS Flowchart (2)](https://github.com/user-attachments/assets/5ced3bdf-825f-44cd-9b65-12298212774b)

---

### 1️⃣ Registration (Before event)
📌 **Purpose:** Allows attendees to register and receive a QR code.  
📌 **Process:**  
- Attendee fills out a registration form.  
- System verifies details and generates a QR code.  
- QR code is sent via **email** or **SMS**.  

📌 **Fields:**  
✅ Full Name  
✅ Address  
✅ Phone Number  
✅ Email Address  
✅ Code Number (SIDC Member Code)  
✅ Submit Button (Generates QR Code & Stores Data)  

---

## Features

---

![image](https://github.com/user-attachments/assets/bac41eee-efde-48da-aa82-d4ed9ba7cc64)
### 2️⃣ Event Check-in Page 
📌 **Purpose:** Attendees scan their QR code upon arrival.  
📌 **Process:**  
- Attendee scans QR code using a camera input.  
- System pulls up attendee details and records **Check-in Time**.  
- If QR code fails, manual entry via Code Number is available.  
- A confirmation message is displayed:  
  _"Welcome [Full Name]! You have successfully checked in."_  

📌 **UI Elements:**  
✅ QR Code Scanner  
✅ Manual Entry Field  
✅ Check-in Button  

---

![image](https://github.com/user-attachments/assets/4b26a655-6846-4ef3-9c86-55e99bf4dc74)
### 3️⃣ Event Check-out Page
📌 **Purpose:** Record when an attendee leaves the event.  
📌 **Process:**  
- Attendee scans the same QR code when leaving.  
- System records **Check-out Time**.  
- Confirmation message:  
  _"Thank you [Full Name]! You have successfully checked out."_  

📌 **UI Elements:**  
✅ QR Code Scanner  
✅ Manual Entry Field  
✅ Check-out Button  

---

![image](https://github.com/user-attachments/assets/2b4df633-9cd3-4fd4-bc76-9d93bccd33f6)
![image](https://github.com/user-attachments/assets/6a042cd8-d04f-4030-880d-24edc7813ddc)
### 4️⃣ Admin Dashboard 
📌 **Purpose:** Manage and monitor event attendance.  

📌 **UI Elements & Features:**  
✅ **Search & Filter:** Name, Code Number, Date  
✅ **Attendance List:** View check-in/out times for each attendee  
✅ **Export Data:** CSV, Excel, PDF  
✅ **Live Attendance Records**  
✅ **Manually Check-in/Check-out Attendees**  
✅ **Resend QR Codes**  

📌 **Table Columns:**  
- Full Name  
- Address  
- Phone Number  
- Email  
- Code Number  
- Check-in Time  
- Check-out Time  

---


![image](https://github.com/user-attachments/assets/80bdcb76-b32b-4ee5-bd0f-2d4930bdc38f)
![image](https://github.com/user-attachments/assets/4049be04-a6fd-4516-b5cd-836a3ed69889)
## 📊 Descriptive Analytics 

### 1️⃣ Registration vs. Attendance Overview  
✅ **Total Registered Attendees** 📋  
✅ **Total Checked-in Attendees** ✅  
✅ **No-Show Count** ❌  
✅ **Attendance Rate (%)** 📊  
Formula:  
\[
\text{Attendance Rate} = \left( \frac{\text{Checked-in Attendees}}{\text{Total Registered Attendees}} \right) \times 100
\]  

**Example Display:**  
🔹 500 Registered | 🔹 420 Checked-in | 🔹 80 No-Shows | 🔹 84% Attendance Rate  

---

### 2️⃣ Check-in & Check-out Trends  
✅ **Peak Check-in Time** ⏰ (Graph)  
✅ **Peak Check-out Time** 📉 (Graph)  
✅ **Average Stay Duration** ⏳  
Formula:  
\[
\text{Avg. Stay Duration} = \frac{\sum (\text{Check-out Time} - \text{Check-in Time})}{\text{Total Checked-in Attendees}}
\]  

**Example:**  
🕒 Peak check-in: **9:00 AM - 10:30 AM**  
🕒 Peak check-out: **3:00 PM - 4:30 PM**  
⏳ Average Stay: **4 hours 15 minutes**  

---

### 3️⃣ Attendance Breakdown by Demographics  
✅ **By Location** 📍 (Pie Chart)  
✅ **By Membership Code (SIDC Members vs. Non-Members)** 🎟️  

**Example:**  
📍 70% from City A, 20% from City B, 10% from other areas  
🎟️ 85% SIDC Members | 15% Non-Members  

---

### 4️⃣ Real-Time Attendance Monitoring  
✅ **Live Counter:** _"Currently at the Event: 320 attendees"_  
✅ **Check-in Progress Bar** 📊 (e.g., 84% Checked-in | 16% Pending)  

---

![image](https://github.com/user-attachments/assets/bcb55f4c-0783-46be-a165-7774e8e46356)
### 5️⃣ Export & Reporting Features  
✅ **Download Attendance** (CSV, Excel, PDF)  
✅ **Filtered Data** (By membership type and status)  

---

### 6️⃣ Additional Features  
✅ **Resend QR Codes** (For attendees who lost them)  
✅ **Manually Check-in/Check-out Attendees** (For technical issues)  

---

## 📌 Suggested Admin Dashboard UI Widgets  
📊 **Quick Stats (Top Cards)**  
✅ Total Registered | Checked-in | No-Shows | Attendance Rate  

📈 **Graphs & Charts (Below Stats)**  
✅ **Check-in & Check-out Trends (Line Chart)**  
✅ **SIDC vs. Non-SIDC Members (Pie Chart)**  
✅ **Attendance by Location (Bar Chart)**  

📌 **Attendance Table (Below Charts)**  
✅ **Search & Filter (By Name, Code, Date, Status)**  
✅ **Live Updating Attendance List**  

---
