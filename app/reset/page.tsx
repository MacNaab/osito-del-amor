"use client";
import React, { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Reset from "@/components/login/reset";

export default function Page() {
  const [message, setMessage] = useState("");

  return (
    <div className="max-w-md mx-auto mt-10">
      <Tabs defaultValue="reset">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="reset">Reset</TabsTrigger>
          <TabsTrigger value="signup"></TabsTrigger>
        </TabsList>
        <TabsContent value="reset" className="space-y-4">
          <Reset setMessage={setMessage} />
        </TabsContent>
        <TabsContent value="signup" className="space-y-4"></TabsContent>
      </Tabs>
      {message && (
        <Alert className="mt-4">
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
