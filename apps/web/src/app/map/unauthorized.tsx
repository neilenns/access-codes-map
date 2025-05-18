"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShieldAlert } from "lucide-react"; // Using a relevant icon
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card
        className="w-full max-w-md"
        role="alert"
        aria-labelledby="unauthorized-title"
        aria-describedby="unauthorized-description"
      >
        {" "}
        <CardHeader className="text-center">
          <div className="mx-auto bg-destructive/10 p-3 rounded-full w-fit mb-4">
            <ShieldAlert
              className="h-10 w-10 text-destructive"
              aria-hidden="true"
            />
          </div>
          <CardTitle id="unauthorized-title">Access denied</CardTitle>
          <CardDescription id="unauthorized-description">
            You do not have the necessary permissions to access this page.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link
              href="/"
              aria-label="Return to the homepage after being denied access"
            >
              Return to homepage
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
