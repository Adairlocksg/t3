import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import type { RouterOutputs } from "~/utils/api";
import relativeTime from "dayjs/plugin/relativeTime";

type PostWithUserProps = RouterOutputs["post"]["getAll"][number];

dayjs.extend(relativeTime);

const PostView = (props: PostWithUserProps) => {
  const { post, author } = props;
  return (
    <div className="flex gap-3 border-b border-slate-400 p-4">
      <Image
        src={author.profileImageUrl}
        className="h-12 w-12 rounded-full"
        alt={`@${author.username || ""}'s profile image`}
        width={48}
        height={48}
      />
      <div className="flex flex-col">
        <div className="flex gap-1 text-slate-300">
          <Link href={`/${post.authorId || ""}`}>
            <span className="font-bold">{`@${author.username || ""}`}</span>
          </Link>
          <Link href={`/post/${post.id}`}>
            <span className="font-thin">{` · ${dayjs(
              post.createdAt
            ).fromNow()}`}</span>
          </Link>
        </div>
        <span className="text-2xl">{post.content}</span>
      </div>
    </div>
  );
};

export default PostView;
