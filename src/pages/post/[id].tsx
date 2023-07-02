import type { NextPage } from "next";
import Head from "next/head";

const SiglePostPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Posts</title>
      </Head>
      <main className="flex h-screen justify-center">
        <div className="w-full border-x border-slate-400 md:max-w-2xl">
          <div className="border-b border-slate-400 p-4">Slug</div>
        </div>
      </main>
    </>
  );
};

export default SiglePostPage;
