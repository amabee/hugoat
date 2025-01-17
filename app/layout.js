import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "WhoGoat Threads",
  description: "WATDAPAK!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico"/>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
