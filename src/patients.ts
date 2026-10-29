import prisma from "./lib/prisma.js";

interface PatientInput {
  firstName: string;
  lastName: string;
  dateOfBirth?: Date;
  gender?: string;
  phone?: string;
  email?: string;
}

export async function createPatient(data: PatientInput) {
  return prisma.patient.create({
    data,
  });
}

export async function getPatient(patientId: number) {
  return prisma.patient.findUnique({
    where: { patientId },
  });
}

export async function searchPatients(name: string) {
  return prisma.patient.findMany({
    where: {
      OR: [
        { firstName: { contains: name, mode: "insensitive" } },
        { lastName: { contains: name, mode: "insensitive" } },
      ],
    },
  });
}

export async function updatePatientPhone(
  patientId: number,
  phone: string,
) {
  return prisma.patient.update({
    where: { patientId },
    data: { phone },
  });
}

export async function deletePatient(patientId: number) {
  return prisma.patient.delete({
    where: { patientId },
  });
}