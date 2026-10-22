import prisma from "./lib/prisma";

interface DoctorInput {
firstName: string;
lastName: string;
specialty: string;
phone?: string;
email?: string;
}

export async function createDoctor(data: DoctorInput) {
return await prisma.doctor.create({
data,
});
}

export async function getDoctor(doctorId: number) {
return await prisma.doctor.findUnique({
where: { doctorId },
});
}

export async function listDoctorsBySpecialty(specialty: string) {
return await prisma.doctor.findMany({
where: {
specialty: { contains: specialty, mode: "insensitive" },
},
});
}

export async function deleteDoctor(doctorId: number) {
return await prisma.doctor.delete({
where: { doctorId },
});
}
