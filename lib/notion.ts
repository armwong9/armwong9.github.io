import fs from "fs";
import path from "path";
import glob from "fast-glob";
import matter from "gray-matter";
import { ExtendedRecordMap } from "notion-types/src/maps";
import { getPageTitle } from "notion-utils";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

const baseDir = path.join(process.cwd(), "./posts");

export const EXPERIENCES = {
  hmc: {
    date: "2015",
    uri: "flying-reading-83e/Harvey-Mudd-College-e35ca23134e34c4e9d0426be54b55c56",
  },
  edr: {
    date: "2016",
    uri: "flying-reading-83e/EDR-6edb7c1e52f1400cb91d904cfc790265",
  },
  intel: {
    date: "2017",
    uri: "flying-reading-83e/Intel-0e4adda997324c1da9be18c5ca50964e",
  },
  microsoft: {
    date: "2017",
    uri: "flying-reading-83e/Microsoft-82fd30a4a4c7474f9c1cd694b1fbf86a",
  },
  amazon: {
    date: "2019",
    uri: "flying-reading-83e/Amazon-07ab409b1af5448a8825960592191b50",
  },
  uw: {
    date: "2020",
    uri: "flying-reading-83e/University-of-Washington-628515ddda324c3b84312253aa0ef0e5",
  },
  google: {
    date: "2022",
    uri: "flying-reading-83e/Google-16fd99d312834634ac1b699958fdbc3b",
  },
};

export interface PageInfo {
  title: string;
  cover?: string;
  coverPosition?: number;
}

export interface Page extends PageInfo {
  date: string;
  uri: string;
}

export const getPageInfo = (page: ExtendedRecordMap): PageInfo => {
  const info: PageInfo = {
    title: getPageTitle(page),
  };

  const block = Object.values(page.block)[0].value;
  if (block.type === "page" && block.format?.page_cover) {
    info.coverPosition = block.format.page_cover_position;
    info.cover =
      "https://www.notion.so/image/" +
      encodeURIComponent(block.format.page_cover) +
      "?table=block&id=" +
      block.id;
  }
  return info;
};

export interface Post {
  source: MDXRemoteSerializeResult;
  data: { [key: string]: any };
  content: string;
}

export const getPosts = (dir: string): Promise<Post[]> => {
  const contentGlob = path.join(path.join(baseDir, dir), "/*.mdx");
  const files = glob.sync(contentGlob);

  return Promise.all(
    files.map(async (file) => {
      const basename = path.basename(file);
      const slug = basename.replace(".mdx", "");
      const raw = fs.readFileSync(file, "utf8");
      const { data, content } = matter(raw);

      data.slug = slug;
      const source = await serialize(content, { scope: data });

      return { data, content: content.trim(), source };
    }),
  );
};
