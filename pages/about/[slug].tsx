import { SyntheticEvent, CSSProperties } from "react";
import Head from "next/head";
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsResult,
  NextPage,
} from "next";
import Container from "@components/Container";

import { NotionAPI } from "notion-client";


import { NotionRenderer } from "react-notion-x";
import { Code } from 'react-notion-x/build/third-party/code';
import { Collection } from 'react-notion-x/build/third-party/collection';
import { Equation } from 'react-notion-x/build/third-party/equation';
import { Modal } from 'react-notion-x/build/third-party/modal';
import { ExtendedRecordMap } from 'notion-types';
import { getPageInfo, Page, EXPERIENCES } from "../../lib/notion";

interface BlogProps {
  page: Page;
  recordMap: ExtendedRecordMap ;
}

const About: NextPage<BlogProps> = ({ page, recordMap }) => (
  <Container width="100%" marginBottom={["1rem", "4rem"]}>
    <Head>
      <title>{page.title}</title>
      <meta property="og:title" content={page.title} />
    </Head>
    <NotionRenderer
        fullPage
        recordMap={recordMap}
        components={{
          Code,
          Collection,
          Equation,
          Modal
        }}
      />
  </Container>
);

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: Object.keys(EXPERIENCES).map((slug) => ({
      params: {
        slug,
      },
    })),
    fallback: false,
  };
};

type Params = {
  params: {
    slug: keyof typeof EXPERIENCES;
  };
};

const notion = new NotionAPI();

export const getStaticProps = async ({
  params: { slug },
}: Params): Promise<GetStaticPropsResult<BlogProps>> => {
  const { uri } = EXPERIENCES[slug];
  const recordMap = await notion.getPage(uri);
  const pageInfo = getPageInfo(recordMap);
  const page: Page = {
    ...pageInfo,
    uri,
  };

  return {
    props: {
      page,
      recordMap,
    },
    revalidate: 60,
  };
};

export default About;
