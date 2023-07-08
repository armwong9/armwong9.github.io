import { SyntheticEvent, CSSProperties } from "react";
import {
  GetStaticPaths,
  GetStaticPropsResult,
  GetStaticPropsContext,
  NextPage,
} from "next";
import Head from "next/head";
import Image from "next/image";
import Container from "@components/Container";

import { NotionAPI } from "notion-client";
import { NotionRenderer } from "react-notion-x";

import { Code } from 'react-notion-x/build/third-party/code';
import { Collection } from 'react-notion-x/build/third-party/collection';
import { Equation } from 'react-notion-x/build/third-party/equation';
import { Modal } from 'react-notion-x/build/third-party/modal';
import { ExtendedRecordMap } from 'notion-types';
import { getAllPagesInSpace } from "notion-utils";

interface ProjectsProps {
  projectsRecordMap: ExtendedRecordMap;
}

const Projects: NextPage<ProjectsProps> = ({ projectsRecordMap }) => {
  console.log(projectsRecordMap);

  if (!projectsRecordMap) {
    return <div>Loading...</div>;
  }

  const customizedMapPageUrl = (rootPageId?: string) => (pageId: string) => {
    pageId = (pageId || "").replace(/-/g, "");
    return `/project/${pageId}`;
  };

  return (
    <Container width="100%" marginBottom={["1rem", "4rem"]}>
      <Head>
        <title>Projects</title>
        <meta property="og:title" content="Project" />
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

export const getStaticPaths: GetStaticPaths = async () => {
  
  const pages = await getAllPagesInSpace(
    "Projects-d63333fedaa94636983ce971882910fe",
    undefined,
    notion.getPage.bind(notion),
    {
      traverseCollections: false,
    },
  );
  const paths = Object.keys(pages).map((pageId) => `/projects/${pageId}`);
  //console.log(paths)
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async (
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<ProjectsProps>> => {
  const pageId = (context?.params?.slug as string) || "";
  const projectsRecordMap = await notion.getPage(pageId);

  return {
    props: {
      projectsRecordMap: projectsRecordMap,
    },
    revalidate: 10,
  };
};

export default Projects;
