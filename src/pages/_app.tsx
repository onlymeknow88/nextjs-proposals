import { Layout } from "@/components/organisms/Layout/Layout";
import { LayoutLogin } from "@/components/organisms/Layout/LayoutLogin";
import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";



export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const noNav = ["/404", "/sso/callback?error=1"];
  const isLoginPage = noNav.includes(router.asPath);
  
  return (
    <NextThemesProvider defaultTheme="light" attribute="class">
      <NextUIProvider>
      <Head>
          <title>Proposals Stakeholder System</title>
          <meta name="description" content="Your Description Here" />
        </Head>
        {isLoginPage ? (
          <LayoutLogin>
            <Component {...pageProps} />
          </LayoutLogin>
        ) : (
            <Layout>
              
              <Component {...pageProps} />
            </Layout>
        )}
      </NextUIProvider>
    </NextThemesProvider>
  );
}
