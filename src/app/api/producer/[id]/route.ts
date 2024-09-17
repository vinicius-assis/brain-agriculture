import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Params = {
  id: string;
};

export async function PATCH(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const data = await request.json();

    const updatedItem = await prisma.producer.update({
      where: { id },
      data: {
        document: data.document,
        name: data.name,
        farmName: data.farmName,
        city: data.city,
        state: data.state,
        totalArea: data.totalArea,
        cultivableArea: data.cultivableArea,
        vegetationArea: data.vegetationArea,
        crops: data.crops,
      },
    });

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error("Error handling request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await prisma.producer.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Item deleted successfully",
      id,
    });
  } catch (error) {
    console.error("Error handling request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
