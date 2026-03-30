import Link from "next/link";
import { formatDate, truncate } from "@/lib/utils";

interface PostCardProps {
  post: {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string | null;
    createdAt: Date | string;
    author: { name: string };
    coverImage: string | null;
  };
}

export default function PostCard({ post }: PostCardProps) {
  const excerpt =
    post.excerpt || truncate(post.content, 160);

  return (
    <article className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-5">
        <div className="text-xs text-gray-500 mb-2">
          {formatDate(post.createdAt)} · {post.author.name}
        </div>
        <h2 className="font-bold text-lg text-[#1a3a6b] mb-2 leading-snug">
          <Link href={`/aktuality/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">{excerpt}</p>
        <Link
          href={`/aktuality/${post.slug}`}
          className="text-[#1a3a6b] text-sm font-semibold hover:text-[#e8c547] transition-colors"
        >
          Číst více →
        </Link>
      </div>
    </article>
  );
}
