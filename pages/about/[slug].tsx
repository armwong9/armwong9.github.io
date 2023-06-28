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
import {
  NotionRenderer,
  NotionRendererProps,
  Code,
  Collection,
  CollectionRow,
  Equation,
  Modal,
} from "react-notion-x";
import { getPageInfo, Page, EXPERIENCES } from "../../lib/notion";

interface BlogProps {
  page: Page;
  recordMap: NotionRendererProps["recordMap"];
}

const About: NextPage<BlogProps> = ({ page, recordMap }) => (
  <Container width="100%" marginBottom={["1rem", "4rem"]}>
    <Head>
      <title>{page.title}</title>
      <meta property="og:title" content={page.title} />
    </Head>
    <NotionRenderer
      fullPage
      className="notion-container"
      recordMap={recordMap}
      customImages
      components={{
        image: ({
          src,
          alt,

          height,
          width,

          className,
          style,
          loading,
          decoding,

          ref,
          onLoad,
        }: {
          src: string;
          alt: string;
          height: number;
          width: number;
          className: string;
          style: CSSProperties;
          loading: string;
          decoding: string;
          ref: string;
          onLoad: SyntheticEvent;
        }) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className={className}
            style={style}
            src={src}
            ref={ref}
            width={width}
            height={height}
            loading="lazy"
            alt={alt}
            decoding="async"
          />
        ),
        collection: Collection,
        collectionRow: CollectionRow,
        code: Code,
        modal: Modal,
        equation: Equation,
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
  const { uri, date } = EXPERIENCES[slug];
  const recordMap = await notion.getPage(uri);
  const pageInfo = getPageInfo(recordMap);
  const page: Page = {
    ...pageInfo,
    uri,
    date,
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
