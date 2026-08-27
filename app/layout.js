import { Orbitron, Exo_2 } from "next/font/google";
import Header from "@/components/Header";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["800", "900"],
  variable: "--font-orbitron",
});

const exo2 = Exo_2({
  subsets: ["latin", "cyrillic"],
  weight: ["600", "800"],
  variable: "--font-exo2",
});

export const metadata = {
  title: "IT104 - LEGENDS OF M.U.",
  description: "IT 104 - A group where legends gathered",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ru"
      data-theme="dark"
      className={`${orbitron.variable} ${exo2.variable}`}
      style={{ scrollBehavior: "smooth" }}
    >
      <body>
        <Header />
        <main>{children}</main>
        <footer>
          <p style={{ fontSize: '2rem' }}>
            <strong>IT 104 - A GROUP WHERE LEGENDS GATHERED</strong>
          </p>
          <p style={{ marginTop: '20px', fontSize: '1.6rem' }}>
            Website made by -{' '}
            <a href="https://t.me/prnoia_0" style={{ color: 'var(--primary)', fontWeight: 900 }}>
              Paranoia
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}