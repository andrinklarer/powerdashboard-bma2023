import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "~/components/ui/toaster";
import Head from "next/head";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
      enableSystem={true}
    >
      <Head>
        <link
          rel="preload"
          href="/dark/LaTeX/eCar.svg"
          as="image"
          type="image/svg+xml"
        />
        <link
          rel="preload"
          href="/light/LaTeX/eCar.svg"
          as="image"
          type="image/svg+xml"
        />
        <link
          rel="preload"
          href="/dark/LaTeX/eCarTotal.svg"
          as="image"
          type="image/svg+xml"
        />
        <link
          rel="preload"
          href="/light/LaTeX/eCarTotal.svg"
          as="image"
          type="image/svg+xml"
        />
      </Head>
      <div className="h-screen bg-background text-foreground">
        <Component {...pageProps} />
      </div>
      <Toaster />
    </ThemeProvider>
  );
};

export default api.withTRPC(MyApp);
