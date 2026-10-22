import prisma from "./lib/prisma.js";

interface DoctorInput {
	firstName: string;
	lastName: string;
	specialty: string;
	phone?: string;
	email?: string;
}

export async function createDoctor(data: DoctorInput) {
	return prisma.doctor.create({
		data,
	});
}

export async function getDoctor(doctorId: number) {
	return prisma.doctor.findUnique({
		where: { doctorId },
	});
}

export async function listDoctorsBySpecialty(specialty: string) {
	return prisma.doctor.findMany({
		where: {
			specialty: { contains: specialty, mode: "insensitive" },
		},
	});
}

export async function deleteDoctor(doctorId: number) {
	return prisma.doctor.delete({
		where: { doctorId },
	});
}
