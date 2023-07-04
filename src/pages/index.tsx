import Head from "next/head";
import { api } from "~/utils/api";
import { SignUp, useUser } from "@clerk/nextjs";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { LoadingPage, LoadingSpinner } from "~/components/loading";
import { useState } from "react";
import type { NextPage } from "next";
import { PageLayout } from "~/components/layout";
import PostView from "~/components/postivew";

const CreatePostWizard = () => {
  const { user } = useUser();

  const ctx = api.useContext();

  const { mutate, isLoading: isPosting } = api.post.create.useMutation({
    onSuccess: () => {
      setInput("");
      toast.success("Post created");
      void ctx.post.getAll.invalidate();
    },
    onError: (err) => {
      const errorMessage = err.data?.zodError?.fieldErrors.content;

      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Failed to create post");
      }
    },
  });

  const [input, setInput] = useState<string>("");

  if (!user) return null;

  return (
    <div className="flex w-full gap-4">
      <Image
        src={user.profileImageUrl}
        alt="profile image"
        className="h-14 w-14 rounded-full"
        width={56}
        height={56}
      />
      <input
        placeholder="Type some emojis"
        className="grow bg-transparent outline-none"
        type="text"
        value={input}
        onKeyDown={(e) => {
          if (e.key !== "Enter") return;
          if (input === "") return;

          mutate({ content: input });
        }}
        onChange={(e) => setInput(e.target.value)}
      />
      {input !== "" && !isPosting && (
        <button onClick={() => mutate({ content: input })}>Post</button>
      )}

      {isPosting && (
        <div className="flex items-center justify-center">
          <LoadingSpinner size={20} />
        </div>
      )}
    </div>
  );
};

const Feed = () => {
  const { data, isLoading: postsLoading } = api.post.getAll.useQuery();

  if (postsLoading) return <LoadingPage />;

  if (!data) return <div>No posts</div>;

  return (
    <section className="flex flex-col">
      {data.map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}
    </section>
  );
};

const Home: NextPage = () => {
  const { isLoaded: userLoaded, isSignedIn } = useUser();

  api.post.getAll.useQuery();

  if (!isSignedIn)
    return (
      <main className="grid h-screen place-items-center">
        <SignUp />
      </main>
    );

  if (!userLoaded) return <div />;

  return (
    <>
      <Head>
        <title>T3 study</title>
        <meta name="description" content="💭" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        <div className="border-b border-slate-400 p-4">
          <CreatePostWizard />
        </div>
        <Feed />
      </PageLayout>
    </>
  );
};

export default Home;
