import prisma from "./lib/prisma.js";

async function main() {
const patient1 = await prisma.patient.create({
data: {
firstName: "Arun",
lastName: "Kumar",
dateOfBirth: new Date("2000-05-15"),
gender: "Male",
phone: "9876543210",
email: "arun.kumar@example.com",
},
});

const patient2 = await prisma.patient.create({
data: {
firstName: "Priya",
lastName: "Devi",
dateOfBirth: new Date("2001-08-20"),
gender: "Female",
phone: "9876543211",
email: "priya.devi@example.com",
},
});

const doctor1 = await prisma.doctor.create({
data: {
firstName: "Ravi",
lastName: "Sharma",
specialty: "Cardiology",
phone: "9876543212",
email: "ravi.sharma@example.com",
},
});

const doctor2 = await prisma.doctor.create({
data: {
firstName: "Meena",
lastName: "Raj",
specialty: "Neurology",
phone: "9876543213",
email: "meena.raj@example.com",
},
});

await prisma.appointment.create({
data: {
appointmentDate: new Date(Date.now() + 86400000),
notes: "Regular checkup",
Patient: { connect: { patientId: patient1.patientId } },
Doctor: { connect: { doctorId: doctor1.doctorId } },
},
});

await prisma.appointment.create({
data: {
appointmentDate: new Date(Date.now() + 172800000),
notes: "Follow-up consultation",
Patient: { connect: { patientId: patient2.patientId } },
Doctor: { connect: { doctorId: doctor2.doctorId } },
},
});

console.log("Seed data created successfully.");
}

main()
.catch((error: unknown) => {
console.error("Seeding failed:", error);
process.exitCode = 1;
})
.finally(async () => {
await prisma.$disconnect();
});
