import "./globals.css";

export const metadata = {
  title: "FinTrack",
  description: "Simple, clear personal finance tracking.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
