"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import Navigation from "./components/navigation";
import Footer from "./components/footer";
import { AuthContextProvider } from "./context/auth-context";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Coffee ni Roy</title>
        <meta name="description" content="Coffee ni Roy 39 Coffee" />
      </head>
      <body className={`${inter.className} bg-slate-100`}>
        <main className="pb-16">
          <AuthContextProvider>
            <Navigation />
            {children}
            <Footer />
          </AuthContextProvider>
        </main>
      </body>
    </html>
  );
}
