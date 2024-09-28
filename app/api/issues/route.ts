import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";
import { createIssueSchema } from "@/types/validationSchema";

interface BodyProps {
  title: string;
  description: string;
}

export const POST = async (request: NextRequest) => {
  const body: BodyProps = await request.json();

  const validation = createIssueSchema.safeParse(body);
  // console.log(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  // console.log(newIssue);

  return NextResponse.json(newIssue, { status: 201 });
};

export const GET = async () => {
  const issues = await prisma.issue.findMany();
  return NextResponse.json(issues);
};
