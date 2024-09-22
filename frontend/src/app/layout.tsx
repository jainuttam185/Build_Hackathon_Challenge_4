import "./globals.css";
import { Handjet } from 'next/font/google';

const inter = Handjet({ subsets: ['latin'] });



export const metadata = {
  title: 'Airdrop Machine',
  description: 'Click to get airdrop',
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
              <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Readex+Pro:wght@160..700&display=swap" />
              </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
