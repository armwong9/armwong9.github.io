import { SyntheticEvent, CSSProperties } from "react";
import React from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { GetStaticPropsResult, NextPage } from "next";
import Container from "@components/Container";
import { NotionAPI } from "notion-client";
import {
  NotionRenderer,
  NotionRendererProps,
  Collection,
  CollectionRow,
  Code,
  Equation,
  Modal,
} from "react-notion-x";

interface BlogProps {
  blogRecordMap: NotionRendererProps["recordMap"];
}

const Blog: NextPage<BlogProps> = ({ blogRecordMap }) => {
  const customizedMapPageUrl = (rootPageId?: string) => (pageId: string) => {
    pageId = (pageId || "").replace(/-/g, "");
    return `/blog/${pageId}`;
  };

  return (
    <Container width="100%" marginBottom={["1rem", "4rem"]} marginTop="0">
      <Head>
        <title>Blog</title>
        <meta property="og:title" content="Blog" />
      </Head>
      <NotionRenderer
        fullPage
        className="notion-container"
        recordMap={blogRecordMap}
        mapPageUrl={customizedMapPageUrl()}
        customImages={true}
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
};

const notion = new NotionAPI();

export const getStaticProps = async (): Promise<
  GetStaticPropsResult<BlogProps>
> => {
  const blogRecordMap = await notion.getPage(
    "697013e1c01f414788eff5e9fdaebaf4",
  );

  return {
    props: {
      blogRecordMap: blogRecordMap,
    },
    revalidate: 60,
  };
};

export default Blog;
