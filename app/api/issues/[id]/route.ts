import prisma from "@/prisma/client";
import { createIssueSchema } from "@/types/validationSchema";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const body = await request.json();

  const validation = createIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    return NextResponse.json({ message: "Issue not found" }, { status: 404 });
  }

  //update issue
  const updatedIssue = await prisma.issue.update({
    where: { id: parseInt(params.id) },
    data: {
      title: body.title,
      description: body.description,
    },
  });

  if (!updatedIssue) {
    return NextResponse.json(
      { message: "Something went Wrong." },
      { status: 500 }
    );
  }

  return NextResponse.json(updatedIssue, { status: 200 });
};

//delete issue
export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }

  const deletedIssue = await prisma.issue.delete({
    where: { id: parseInt(params.id) },
  });

  if (!deletedIssue) {
    return NextResponse.json(
      { error: "Something went wring" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "Issue deleted successfully" },
    { status: 200 }
  );
};
