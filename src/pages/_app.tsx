import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "~/components/ui/toaster";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
      enableSystem={true}
    >
      <Head>
        <title>Dashboard des Schweizerenergiehaushaltes</title>
        <meta
          name="description"
          content="Erhalten sie einzigartige Einblicke in den Stromhaushalt der Schweiz. Analysieren Sie historische und aktuelle Daten, manipulieren Sie diese mit verschiedenen Parametern und erkunden Sie hypothetische Szenarien. Informieren Sie sich über die Standpunkte verschiedener Parteien zur Stromversorgung. Ein interaktives Tool zur Förderung des Verständnisses und der Diskussion über Energieversorgung und -politik."
        />
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
        <Analytics />
      </div>
      <Toaster />
    </ThemeProvider>
  );
};

export default api.withTRPC(MyApp);
