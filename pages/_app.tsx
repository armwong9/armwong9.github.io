import { AppProps } from "next/app";
import { motion } from "framer-motion";
import Layout from "@components/Layout";

// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css";

// used for collection views
import "rc-dropdown/assets/index.css";

// used for equation
import "katex/dist/katex.min.css";

// used for code highlighting
import "prismjs/themes/prism.css";
import "prismjs/prism.js";
import "prismjs/components/prism-go";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-graphql";
import "prismjs/components/prism-bash";

import "@styles/global.css";

const App = ({ Component, pageProps }: AppProps): JSX.Element => (
  <Layout>
    {/* <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    > */}
    <Component {...pageProps} />
    {/* </motion.div> */}
  </Layout>
);

export default App;
