import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { PageLayout } from "~/components/layout";
import { LoadingPage } from "~/components/loading";
import PostView from "~/components/postivew";
import { api } from "~/utils/api";

const ProfileFeed = (props: { userId: string }) => {
  const { data, isLoading } = api.post.getPostsByUserId.useQuery({
    userId: props.userId,
  });

  if (isLoading) return <LoadingPage />;

  if (!data || !data.length) return <div>User has not posted!</div>;

  return (
    <div className="flex flex-col">
      {data.map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}
    </div>
  );
};

const ProfilePage: NextPage = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("slug") || "";

  const { data, isLoading } = api.profile.getUserById.useQuery({
    id: userId,
  });

  if (isLoading) return <LoadingPage />;

  if (!data) return <div>404 Not found</div>;

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <PageLayout>
        <div className="relative h-48 bg-slate-600">
          <Image
            src={data.profileImageUrl}
            width={128}
            height={128}
            alt={`@${data.username || ""}'s profile image`}
            className="absolute bottom-0 left-0 -mb-[64px] ml-4 rounded-full border-4 border-black"
          />
        </div>
        <div className="h-[64px]"></div>
        <div className="p-4 text-2xl font-bold">{`@${
          data.username ?? ""
        }`}</div>
        <div className="w-full border-b border-slate-400"></div>
        <ProfileFeed userId={data.id} />
      </PageLayout>
    </>
  );
};

export default ProfilePage;
