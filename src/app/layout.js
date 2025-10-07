import "./globals.css";

export const metadata = {
  title: "Happy Birthday!",
  description: "A celebration of your Day",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
