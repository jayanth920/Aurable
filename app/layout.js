import { Toaster } from "sonner";
import ConvexClientProvider from "./ConvexClientProvider";
import "./globals.css";
import Provider from "./provider";

export const metadata = {
  title: "Aurable",
  description: "Build web apps with AI through prompting.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body>
        <ConvexClientProvider>
          <Provider>{children}</Provider>
          <Toaster />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
