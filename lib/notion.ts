import fs from "fs";
import path from "path";
import glob from "fast-glob";
import matter from "gray-matter";
import { ExtendedRecordMap } from 'notion-types';
import { getPageTitle } from "notion-utils";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

const baseDir = path.join(process.cwd(), "./posts");

export const EXPERIENCES = {
  vizrt: {
    uri: "Vizrt-Group-68c6c1b72b494289b436acab759f00fb",
  },
  pomona_college: {
    uri: "Pomona-College-177816020c8b49d1ac0182acdcda7c0c",
  },
  harvey_mudd: {
    uri: "Harvey-Mudd-College-261f1347687940d0969e14855991528d",
  },
  berkeley: {
    uri: "University-of-California-Berkeley-cb49cc5a4a1c4dca8e652d03b9db8190",
  },
  pomona: {
    uri: "Pomona-College-0da5b757bd65465ab4308e84427c558b",
  },
  winchester: {
    uri: "Winchester-College-12aca678687c4fbd9cae1a7b62ac1eac",
  },
};

export const EDUCATION = {

};

export interface PageInfo {
  title: string;
  cover?: string;
  coverPosition?: number;
}

export interface Page extends PageInfo {
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

export const getPosts = async (dir: string): Promise<Post[]> => {
  // define paths for both experiences and education posts
  const experiencesContentGlob = path.join(path.join(baseDir, 'experiences'), "/*.mdx");
  const educationContentGlob = path.join(path.join(baseDir, 'education'), "/*.mdx");

  // select the appropriate path based on dir
  const selectedPath = dir === 'experiences' ? experiencesContentGlob : educationContentGlob;

  const files = glob.sync(selectedPath);

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
