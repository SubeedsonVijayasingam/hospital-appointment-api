import prisma from "./lib/prisma";

interface AppointmentInput {
patientId: number;
doctorId: number;
appointmentDate: Date;
notes?: string;
}

export async function bookAppointment(data: AppointmentInput) {
return await prisma.appointment.create({
data: {
appointmentDate: data.appointmentDate,
notes: data.notes,
Patient: {
connect: { patientId: data.patientId },
},
Doctor: {
connect: { doctorId: data.doctorId },
},
},
include: {
Patient: true,
Doctor: true,
},
});
}

export async function getAppointmentFull(appointmentId: number) {
return await prisma.appointment.findUnique({
where: { appointmentId },
include: {
Patient: true,
Doctor: true,
},
});
}

export async function getDoctorUpcomingAppointments(doctorId: number) {
return await prisma.appointment.findMany({
where: {
doctorId,
appointmentDate: { gte: new Date() },
status: "Scheduled",
},
include: {
Patient: true,
},
orderBy: {
appointmentDate: "asc",
},
});
}

export async function setAppointmentStatus(
appointmentId: number,
status: string,
) {
return await prisma.appointment.update({
where: { appointmentId },
data: { status },
});
}

export async function cancelAllPatientAppointments(patientId: number) {
return await prisma.appointment.updateMany({
where: {
patientId,
status: "Scheduled",
},
data: {
status: "Cancelled",
},
});
}

export async function deleteAppointment(appointmentId: number) {
return await prisma.appointment.delete({
where: { appointmentId },
});
}
