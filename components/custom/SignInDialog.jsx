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
import { useConvex } from "convex/react";

function SignInDialog() {
  const {openDialog, setOpenDialog} = useContext(SignInDialogContext);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const convex = useConvex();
  const CreateUser = useMutation(api.users.CreateUser);
  

const googleLogin = useGoogleLogin({
  onSuccess: async (tokenResponse) => {
    try {
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: "Bearer " + tokenResponse?.access_token } }
      );

      const googleUser = userInfo.data;

      // tep 1: Create or upsert user in DB
      await CreateUser({
        name: googleUser?.name,
        email: googleUser?.email,
        picture: googleUser?.picture,
        uid: uuid4(),
      });

      // Step 2: Fetch full, fresh user with `.token` from DB
      const result = await convex.query(api.users.GetUser, {
        email: googleUser?.email,
      });

      // Step 3: Store only server-trusted user in localStorage + context
      localStorage.setItem("user", JSON.stringify(result));
      setUserDetail(result);

      setOpenDialog(false);
    } catch (err) {
      console.error("Google login error:", err);
    }
  },
  onError: () => {
    alert("Google sign-in failed. Please try again.");
  },
});

  
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
          </DialogTitle>
          <h2 className="font-bold text-2xl text-center text-white" style={{fontFamily:'KaiseiOpti'}}>
            {Lookup.SIGNIN_HEADING}
          </h2>
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
