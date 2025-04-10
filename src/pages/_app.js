// src/pages/_app.js
import "../styles/globals.css";
import localFont from "next/font/local";
import { useEffect } from "react";
import { useRouter } from "next/router";
import ProtectedRoute from "./protectedroute";

const poppins = localFont({
  src: "../styles/Poppins-Regular.woff",
  variable: "--font-poppins-r",
  weight: "100 200 300 400 500 600 700 800 900",
});

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token && router.pathname !== "/login") {
      router.replace("/login");
    }
  }, [router]);

  return (
    <div
      className={`${poppins.variable} font-[family-name:var(--font-poppins-r)] antialiased`}>
      {router.pathname !== "/login" ? (
        <ProtectedRoute>
          <Component {...pageProps} />
        </ProtectedRoute>
      ) : (
        <Component {...pageProps} />
      )}
    </div>
  );
}

export default MyApp;
