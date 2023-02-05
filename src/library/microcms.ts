import { createClient, MicroCMSQueries } from "microcms-js-sdk";
// const client = createClient({
//   serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
//   apiKey: import.meta.env.MICROCMS_API_KEY,
//  serviceDomain: "import.meta.env.MICROCMS_SERVICE_DOMAIN",
//  apiKey: "import.meta.env.MICROCMS_API_KEY",
//  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
//  apiKey: process.env.MICROCMS_API_KEY,
  // serviceDomain: "process.env.MICROCMS_SERVICE_DOMAIN",
  // apiKey: "process.env.MICROCMS_API_KEY",
// });

const clientFactoryFunction = () => {
  return createClient({
    serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
    apiKey: import.meta.env.MICROCMS_API_KEY,
  });
}

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
};
export type BlogResponse = {
  totalCount: number;
  offset: number;
  limit: number;
  contents: Blog[];
};

export const getBlogs = async (queries?: MicroCMSQueries) => {
  const client = clientFactoryFunction();
  const data = await client.get<BlogResponse>({ endpoint: "blogs", queries });

  if (data.offset + data.limit < data.totalCount) {
    queries ? (queries.offset = data.offset + data.limit) : "";
    const result: BlogResponse = await getBlogs(queries);
    return {
      offset: result.offset,
      limit: result.limit,
      contents: [...data.contents, ...result.contents],
      totalCount: result.totalCount,
    };
  }
  return data;
};

export const getBlogDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  const client = clientFactoryFunction();
  return await client.getListDetail<Blog>({
    endpoint: "blogs",
    contentId,
    queries,
  });
};