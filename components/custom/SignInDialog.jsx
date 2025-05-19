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
    onError: (errorResponse) => console.error("OAuth error:", errorResponse),
  });

  
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <h2 className="font-bold text-2xl text-center text-white">
            {Lookup.SIGNIN_HEADING}
          </h2>
          <DialogDescription>
            {Lookup.SIGNIN_SUBHEADING} {/* Just plain text here */}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col justify-center items-center gap-3 mt-2">
          <Button
            className="bg-blue-500 text-white hover:bg-blue-400"
            onClick={() => googleLogin()}
          >
            Signin In With Google
          </Button>
          <p className="text-sm text-muted-foreground text-center">
            {Lookup.SIGNIn_AGREEMENT_TEXT}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SignInDialog;
