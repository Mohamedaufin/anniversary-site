import { Shantell_Sans } from "next/font/google";
import "./globals.css";

const shantellSans = Shantell_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Happy Birthday!",
  description: "A celebration of your Day",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${shantellSans.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
