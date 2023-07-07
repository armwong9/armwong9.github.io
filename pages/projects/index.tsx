import { SyntheticEvent, CSSProperties } from "react";
import { GetStaticPropsResult, NextPage } from "next";
import Head from "next/head";
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

interface ProjectsProps {
  projectsRecordMap: NotionRendererProps["recordMap"];
}

const customizedMapPageUrl = (rootPageId?: string) => (pageId: string) => {
  pageId = (pageId || "").replace(/-/g, "");
  return `/projects/${pageId}`;
};


const Projects: NextPage<ProjectsProps> = ({ projectsRecordMap }) => (
  <Container width="100%" marginBottom={["1rem", "4rem"]}>
    <Head>
      <title>Projects</title>
      <meta property="og:title" content="Projects" />
    </Head>
    <NotionRenderer
      fullPage
      className="notion-container"
      recordMap={projectsRecordMap}
      mapPageUrl={customizedMapPageUrl()}
      components={{
        image: ({
          src,
          alt,
          height,
          width,
          className,
          style,
          ref,
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
        equation: Equation
      }}
    />
  </Container>
);

const notion = new NotionAPI();

export const getStaticProps = async (): Promise<
  GetStaticPropsResult<ProjectsProps>
> => {
  const projectsRecordMap = await notion.getPage(
    "Projects-d63333fedaa94636983ce971882910fe",
  );

  return {
    props: {
      projectsRecordMap: projectsRecordMap,
    },
    revalidate: 60,
  };
};


export default Projects;
