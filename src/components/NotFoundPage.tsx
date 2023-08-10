"use client";

import React from "react";
import { Button } from "./ui/Button";
import { useRouter } from "next/navigation";

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1 style={{ fontSize: "4rem", marginBottom: "20px" }}>404</h1>
      <p style={{ fontSize: "1.5rem", marginBottom: "20px" }}>Page Not Found</p>
      <p style={{ fontSize: "1rem" }}>
        The page you're looking for does not exist.
      </p>
      <Button onClick={() => router.back()} variant="outline" className="mt-3">
        Go Back
      </Button>
    </div>
  );
};

export default NotFoundPage;
