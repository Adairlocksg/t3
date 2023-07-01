import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import { SignUp, useUser, SignOutButton } from "@clerk/nextjs";

export default function Home() {
  const user = useUser();
  const { data } = api.post.getAll.useQuery();

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        {user.isSignedIn && <SignOutButton />}
        {!user.isSignedIn && <SignUp />}
        <section>
          {data?.map((post) => (
            <div key={post.id}>{post.content}</div>
          ))}
        </section>
      </main>
    </>
  );
}
