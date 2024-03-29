import { createClient } from "microcms-js-sdk";
import type { MicroCMSQueries } from "microcms-js-sdk";

// export const client = createClient({
//   serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
//   apiKey: import.meta.env.MICROCMS_API_KEY,
// });
import { Cache, CacheContainer } from "node-ts-cache";
import { MemoryStorage } from "node-ts-cache-storage-memory";

const userCache = new CacheContainer(new MemoryStorage());

export type Blog = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  content: string;
  eyecatch: {
    url: string;
    height: number;
    width: number;
  };
  category: {
    id: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    revisedAt: string;
    name: string;
  };
};
export type BlogResponse = {
  totalCount: number;
  offset: number;
  limit: number;
  contents: Blog[];
};
export type Category = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  name: string;
};
export type CategoryResponse = {
  totalCount: number;
  offset: number;
  limit: number;
  contents: Category[];
};
export type Link = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  url: string;
};
export type LinkResponse = {
  totalCount: number;
  offset: number;
  limit: number;
  contents: Link[];
};

class CMSBlog {
  @Cache(userCache, { ttl: 300 })
  // export const getBlogs = async (queries?: MicroCMSQueries) => {
  public async getBlogs(runtime?:any,queries?: MicroCMSQueries) {

    const serviceDomain = runtime ? runtime.env.MICROCMS_SERVICE_DOMAIN: import.meta.env.MICROCMS_SERVICE_DOMAIN;
    const apiKey = runtime ? runtime.env.MICROCMS_API_KEY: import.meta.env.MICROCMS_API_KEY;
    const client = createClient({
      serviceDomain: serviceDomain,
      apiKey: apiKey,
    });
    
    const data = await client.get<BlogResponse>({ endpoint: "blogs", queries });

    if (data.offset + data.limit < data.totalCount) {
      queries ? (queries.offset = data.offset + data.limit) : "";
      const result: BlogResponse = await this.getBlogs(runtime,queries);
      return {
        offset: result.offset,
        limit: result.limit,
        contents: [...data.contents, ...result.contents],
        totalCount: result.totalCount,
      };
    }
    return data;
  }
  public async getBlogDetail(contentId: string, runtime?:any,queries?: MicroCMSQueries) {

    const serviceDomain = runtime ? runtime.env.MICROCMS_SERVICE_DOMAIN: import.meta.env.MICROCMS_SERVICE_DOMAIN;
    const apiKey = runtime ? runtime.env.MICROCMS_API_KEY: import.meta.env.MICROCMS_API_KEY;
    const client = createClient({
      serviceDomain: serviceDomain,
      apiKey: apiKey,
    });
    
    return await client.getListDetail<Blog>({
      endpoint: "blogs",
      contentId,
      queries,
    });
  }
}
export const cmsBlog = new CMSBlog();
