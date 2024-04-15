import { StreamVideoProvider } from "@/providers/StreamClientProvider";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Video Call",
  description: "Video Calling App",
  icons: {
    icon: "/icons/logo.svg",
  },
};


const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </div>
  );
};

export default RootLayout;
