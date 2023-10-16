import "./globals.css";
import { Inter } from "next/font/google";
import Navigation from "./components/navigation";
import Footer from "./components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Coffee ni Roy",
  description: "Coffe ni Roy 39 Coffee",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-200`}>
        <main className="pb-16">
          <Navigation />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
