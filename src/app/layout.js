import "./globals.css";

export const metadata = {
  title: "Happy Anniversary!",
  description: "A celebration of our love",
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
