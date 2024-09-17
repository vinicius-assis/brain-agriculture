import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const existingProducer = await prisma.producer.findUnique({
      where: { document: data.document },
    });

    if (existingProducer) {
      return NextResponse.json(
        { error: "Profile with this document already exists" },
        { status: 400 }
      );
    }

    const newProducer = await prisma.producer.create({
      data,
    });

    return NextResponse.json(
      {
        message: "Data saved successfully",
        data: newProducer,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET() {
  try {
    const producers = await prisma.producer.findMany();
    return NextResponse.json(producers);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
