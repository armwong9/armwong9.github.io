import { SyntheticEvent, CSSProperties } from "react";
import { GetStaticPropsResult, NextPage } from "next";
import Head from "next/head";
import Container from "@components/Container";

import { NotionAPI } from "notion-client";
import {
  NotionRenderer
} from "react-notion-x";

import { Code } from 'react-notion-x/build/third-party/code';
import { Collection } from 'react-notion-x/build/third-party/collection';
import { Equation } from 'react-notion-x/build/third-party/equation';
import { Modal } from 'react-notion-x/build/third-party/modal';
import { ExtendedRecordMap } from 'notion-types';
import Link from 'next/link';

interface ProjectsProps {
  projectsRecordMap: ExtendedRecordMap;
}

const customizedMapPageUrl = (rootPageId?: string) => (pageId: string) => {
  pageId = (pageId || "").replace(/-/g, "");
  return `/projects/${pageId}`;
};


const Projects: NextPage<ProjectsProps> = ({ projectsRecordMap }) => {
  if (!projectsRecordMap) {
    return <div>Loading...</div>;
  }

  return (
    <Container width="100%" marginBottom={["1rem", "4rem"]}>
      <Head>
        <title>Projects</title>
        <meta property="og:title" content="Projects" />
      </Head>
      <NotionRenderer
        fullPage
        recordMap={projectsRecordMap}
        mapPageUrl={customizedMapPageUrl()}
        components={{
          Code,
          Collection,
          Equation,
          Modal
        }}
      />
    </Container>
  );
};


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
    revalidate: 10,
  };
};


export default Projects;
