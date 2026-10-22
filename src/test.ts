import {
	createPatient,
	getPatient,
	searchPatients,
	updatePatientPhone,
	deletePatient,
} from "./patients.js";

import {
createDoctor,
getDoctor,
listDoctorsBySpecialty,
deleteDoctor,
} from "./doctors.js";

import {
bookAppointment,
getAppointmentFull,
getDoctorUpcomingAppointments,
setAppointmentStatus,
cancelAllPatientAppointments,
deleteAppointment,
} from "./appointments.js";

async function main() {
console.log("=== PATIENT TESTS ===");

const patient = await createPatient({
firstName: "Test",
lastName: "Patient",
email: "[test.patient@example.com](mailto:test.patient@example.com)",
phone: "9000000001",
});

console.log("Created patient:", patient);

console.log("Get patient:", await getPatient(patient.patientId));

console.log("Search patients:", await searchPatients("Test"));

await updatePatientPhone(patient.patientId, "9000000002");
console.log("Updated patient phone.");

console.log("=== DOCTOR TESTS ===");

const doctor = await createDoctor({
firstName: "Test",
lastName: "Doctor",
specialty: "Cardiology",
email: "[test.doctor@example.com](mailto:test.doctor@example.com)",
});

console.log("Created doctor:", doctor);

console.log("Get doctor:", await getDoctor(doctor.doctorId));

console.log(
"Doctors by specialty:",
await listDoctorsBySpecialty("Cardiology"),
);

console.log("=== APPOINTMENT TESTS ===");

const appointment = await bookAppointment({
patientId: patient.patientId,
doctorId: doctor.doctorId,
appointmentDate: new Date(Date.now() + 86400000),
notes: "Test appointment",
});

console.log("Booked appointment:", appointment);

console.log(
"Full appointment:",
await getAppointmentFull(appointment.appointmentId),
);

console.log(
"Doctor upcoming appointments:",
await getDoctorUpcomingAppointments(doctor.doctorId),
);

await setAppointmentStatus(appointment.appointmentId, "Completed");
console.log("Updated appointment status.");

await cancelAllPatientAppointments(patient.patientId);
console.log("Cancelled remaining scheduled appointments.");

await deleteAppointment(appointment.appointmentId);
console.log("Deleted appointment.");

await deletePatient(patient.patientId);
console.log("Deleted patient.");

await deleteDoctor(doctor.doctorId);
console.log("Deleted doctor.");

console.log("All tests completed successfully.");
}

main().catch((error: unknown) => {
console.error("Test failed:", error);
process.exitCode = 1;
});
