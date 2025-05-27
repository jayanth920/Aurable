"use client";
import React, { useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Header from "@/components/custom/Header";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSideBar from "@/components/custom/AppSideBar";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { ActionContext } from "@/context/ActionContext";
import { useRouter } from "next/navigation";
import { SignInDialogContext } from "@/context/SignInDialogContext";

function Provider({ children }) {
  const [messages, setMessages] = useState();
  const [userDetail, setUserDetail] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [action, setAction] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter();
  const convex = useConvex();

  useEffect(() => {
    IsAuthenticated();
  }, []);

const IsAuthenticated = async () => {
  try {
    if (typeof window === "undefined") return;

    const userStr = localStorage.getItem("user");
    if (!userStr) {
      setLoadingUser(false);
      router.push("/");
      return;
    }

    const user = JSON.parse(userStr);
    const result = await convex.query(api.users.GetUser, {
      email: user?.email,
    });

    setUserDetail(result);
  } catch (err) {
    console.error("Auth check failed:", err);
  } finally {
    setLoadingUser(false);
  }
};

  return (
    <div>
      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY}
      >
        <PayPalScriptProvider
          options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_Id }}
        >
          <SignInDialogContext.Provider value={{ openDialog, setOpenDialog }}>
            <UserDetailContext.Provider
              value={{ userDetail, setUserDetail, loadingUser }}
            >
              <MessagesContext.Provider value={{ messages, setMessages }}>
                <ActionContext.Provider value={{ action, setAction }}>
                  <NextThemesProvider
                    attribute="class"
                    defaultTheme="dark"
                  >
                    <SidebarProvider defaultOpen={false}>
                      <AppSideBar />
                      <main className="w-full">
                        <Header />
                        {children}
                      </main>
                    </SidebarProvider>
                  </NextThemesProvider>
                </ActionContext.Provider>
              </MessagesContext.Provider>
            </UserDetailContext.Provider>
          </SignInDialogContext.Provider>
        </PayPalScriptProvider>
      </GoogleOAuthProvider>
    </div>
  );
}

export default Provider;
