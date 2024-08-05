"use client";
import React, { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignIn from "@/components/login/signIn";
import SignUp from "@/components/login/signUp";

export default function AuthPage() {
  const [message, setMessage] = useState("");

  return (
    <div className="max-w-md mx-auto mt-10">
      <Tabs defaultValue="signin">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="signin" className="space-y-4">
          <SignIn setMessage={setMessage} />
        </TabsContent>
        <TabsContent value="signup" className="space-y-4">
          <SignUp setMessage={setMessage} />
        </TabsContent>
      </Tabs>
      {message && (
        <Alert className="mt-4">
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
