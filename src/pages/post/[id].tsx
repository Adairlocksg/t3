import type { NextPage } from "next";
import Head from "next/head";
import { useSearchParams } from "next/navigation";
import { PageLayout } from "~/components/layout";
import { LoadingPage } from "~/components/loading";
import PostView from "~/components/postivew";
import { api } from "~/utils/api";

const SinglePostPage: NextPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";

  const { data, isLoading } = api.post.getPostById.useQuery({
    id: id,
  });

  if (isLoading) return <LoadingPage />;

  if (!data) return <div>404 Not found</div>;

  return (
    <>
      <Head>
        <title>{`${data.post.content} - ${data.author.username || ""}`}</title>
      </Head>
      <PageLayout>
        <PostView {...data} />
      </PageLayout>
    </>
  );
};

export default SinglePostPage;
