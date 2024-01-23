import { SWRConfig } from "swr";
import GlobalStyle from "../styles";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: async (...args) => {
          const response = await fetch(...args);
          if (!response.ok) {
            throw new Error(`Request with ${JSON.stringify(args)} failed.`);
          }
          return await response.json();
        },
      }}
    >
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  );
}
