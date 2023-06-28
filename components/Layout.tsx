import React from "react";
import Head from "next/head";
import Container from "@components/Container";
import Nav from "@components/Nav";
import Footer from "@components/Footer";

import styles from "@styles/Home.module.css";

type LayoutProps = {
  children?: React.ReactNode;
  title?: string;
};

const Layout: React.FC<LayoutProps> = ({
  title = "Teerapat Jenrungrot",
  children,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta name="author" content="Teerapat Jenrungrot" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Teerapat Jenrungrot" />
        <meta
          property="og:description"
          content="Personal Website - Teerapat Jenrungrot"
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og_image.jpeg" />
        <meta property="og:image:alt" content="Teerapat Jenrungrot" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "43dc622b79274d33a8b2355092e9bb3a"}'
        ></script>
      </Head>
      <Nav
        isOpen={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
      />
      <Container justifyContent="space-between">
        {!isOpen && <main className={styles.main}>{children}</main>}
        <Footer />
      </Container>
    </div>
  );
};

export default Layout;
