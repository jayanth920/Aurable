"use client";
import React, { useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Lookup from "@/data/Lookup";
import { Button } from "../ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import uuid4 from "uuid4";
import { SignInDialogContext } from "@/context/SignInDialogContext";
import { ButtonCta } from "../ui/button-shiny";

function SignInDialog() {
  const {openDialog, setOpenDialog} = useContext(SignInDialogContext);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const CreateUser = useMutation(api.users.CreateUser);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Get Google user info
        const userInfo = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          { headers: { Authorization: "Bearer " + tokenResponse?.access_token } }
        );
  
        const googleUser = userInfo.data;
  
        // Create user in Convex and get inserted _id
        const convexUserId = await CreateUser({
          name: googleUser?.name,
          email: googleUser?.email,
          picture: googleUser?.picture,
          uid: uuid4(), // optional if you're also using `email` for uniqueness
        });
  
        // Merge Google user data with Convex _id
        const fullUser = {
          ...googleUser,
          _id: convexUserId,
        };
  
        // Save to localStorage and context
        localStorage.setItem("user", JSON.stringify(fullUser));
        setUserDetail(fullUser);

        console.log(fullUser);
  
        // Close the sign-in dialog
        setOpenDialog(false);
      } catch (err) {
        console.error("Google login error:", err);
      }
    },
onError: (errorResponse) => {
  // console.error("OAuth error occurred.");
  console.dir(errorResponse, { depth: null });
  alert("Google sign-in failed. Please try again.");
}  });

  
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
          <h2 className="font-bold text-2xl text-center text-white" style={{fontFamily:'KaiseiOpti'}}>
            {Lookup.SIGNIN_HEADING}
          </h2>
          </DialogTitle>
          <DialogDescription className="text-center" style={{fontFamily:'KaiseiOpti'}}>
            {Lookup.SIGNIN_SUBHEADING} {/* Just plain text here */}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col justify-center items-center gap-3 mt-1">
          <ButtonCta
            className="text-base"
            onClick={() => googleLogin()}
            label="Sign in with Google"
          />
          <p className="text-muted-foreground text-center" style={{fontFamily:'KaiseiOpti', fontSize:'13px'}}>
            {Lookup.SIGNIn_AGREEMENT_TEXT}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SignInDialog;
