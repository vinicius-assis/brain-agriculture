import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const {
      document,
      producerName,
      farmName,
      city,
      state,
      totalArea,
      cultivableArea,
      vegetationArea,
      crops,
    } = data;

    if (
      !document ||
      !producerName ||
      !farmName ||
      !city ||
      !state ||
      !totalArea ||
      !cultivableArea ||
      !vegetationArea ||
      !crops
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const existingProducer = await prisma.producer.findUnique({
      where: { document },
    });

    if (existingProducer) {
      return NextResponse.json(
        { error: "Profile with this document already exists" },
        { status: 400 }
      );
    }

    const newProducer = await prisma.producer.create({
      data: {
        document,
        name: producerName,
      },
    });

    const newFarm = await prisma.farm.create({
      data: {
        farmName,
        city,
        state,
        totalArea,
        cultivableArea,
        vegetationArea,
        crops,
        producerId: newProducer.id,
      },
    });

    return NextResponse.json(
      { message: "Data saved successfully", data: newFarm },
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
    const producers = await prisma.producer.findMany({
      include: {
        farms: true,
      },
    });

    return NextResponse.json(
      { message: "Producers fetched successfully", data: producers },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching producers:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Producer ID is required" },
        { status: 400 }
      );
    }

    await prisma.farm.deleteMany({
      where: { producerId: id },
    });

    await prisma.producer.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Producer deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting producer:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function PATCH(request: Request) {
  try {
    const data = await request.json();

    const {
      id,
      document,
      name,
      farmName,
      city,
      state,
      totalArea,
      cultivableArea,
      vegetationArea,
      crops,
    } = data;

    if (!id) {
      return NextResponse.json(
        { error: "Producer ID is required" },
        { status: 400 }
      );
    }

    const farmFields = {
      farmName,
      city,
      state,
      totalArea,
      cultivableArea,
      vegetationArea,
      crops,
    };

    const hasFarmFields = Object.values(farmFields).some(Boolean);
    const producerFields = { document, name };

    let updatedProducer = null;
    if (document || name) {
      updatedProducer = await prisma.producer.update({
        where: { id },
        data: producerFields,
      });
    }

    let updatedFarms = null;
    if (hasFarmFields) {
      updatedFarms = await prisma.farm.updateMany({
        where: { producerId: id },
        data: farmFields,
      });
    }

    if (!updatedProducer && !updatedFarms) {
      return NextResponse.json(
        { error: "No valid fields to update" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "Data updated successfully",
        data: { updatedProducer, updatedFarms },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
