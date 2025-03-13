"use client";
import { auth } from "@/configs/firebaseConfig";
import {
  GoogleAuthProvider,
  signInWithPopup,
  browserLocalPersistence,
  setPersistence,
} from "firebase/auth";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function Authentication({ children }: any) {
  const provider = new GoogleAuthProvider();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onButtonPress = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      await setPersistence(auth, browserLocalPersistence);
      const result = await signInWithPopup(auth, provider);
      const credential: any = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;

      toast.success("Successfully signed in!");

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1500);
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Authentication error:", errorCode, errorMessage);

      if (errorCode === "auth/popup-closed-by-user") {
        toast.error("Sign-in cancelled. Please try again.");
      } else {
        toast.error(`Sign-in failed: ${errorMessage}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div
        onClick={onButtonPress}
        className={`${
          isLoading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
        } transition-opacity`}
      >
        {children}
      </div>
    </div>
  );
}

export default Authentication;
