import "./globals.css";
import Providers from "./providers";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Rock Roller",
  description: "Better prepared golfers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          background: "#dededc",
          color: "#1b1b1b",
        }}
      >
        <Providers>
          <header
            style={{
              height: 72,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 18px",
              borderBottom: "1px solid rgba(0,0,0,0.10)",
              background: "rgba(222,222,220,0.92)",
              backdropFilter: "blur(6px)",
              position: "sticky",
              top: 0,
              zIndex: 10,
            }}
          >
            <Link href="/" style={{ display: "flex", alignItems: "center" }}>
              <Image
                src="/rockroller.png"
                alt="Rock Roller Golf"
                width={110}
                height={40}
                priority
                style={{ height: "auto", width: 110 }}
              />
            </Link>

            <nav style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <Link
                href="/profile"
                style={{
                  fontSize: 12,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#5a5a5a",
                  textDecoration: "none",
                  fontWeight: 700,
                }}
              >
                Profile
              </Link>

              <Link
                href="/check-in"
                style={{
                  fontSize: 12,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#5a5a5a",
                  textDecoration: "none",
                  fontWeight: 700,
                }}
              >
                Daily Check-In
              </Link>
            </nav>
          </header>

          <main
            style={{
              minHeight: "calc(100vh - 72px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "32px 16px",
            }}
          >
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
