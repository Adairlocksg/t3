import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { PageLayout } from "~/components/layout";
import { LoadingPage, LoadingSpinner } from "~/components/loading";
import { api } from "~/utils/api";

const ProfilePage: NextPage = () => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("slug") || "";

  // if (userName === "") return <div>404 Not found</div>;

  const { data, isLoading } = api.profile.getUserByUserName.useQuery({
    userName: userName?.replace("@", ""),
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
        <div className="p-4 text-2xl font-bold">{`@${data.username ?? ""}`}</div>
        <div className="border-b border-slate-400 w-full"></div>
      </PageLayout>
    </>
  );
};

export default ProfilePage;
