import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { format } from "date-fns";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Breadit",
  description: "A Reddit clone built with Next.js and TypeScript.",
};

const Layout = async ({
  children,
  params: { slug },
}: {
  children: ReactNode;
  params: { slug: string };
}) => {
  const session: any = await getAuthSession();

  const subreddit = await db.subreddit.findFirst({
    where: { name: slug },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
        },
      },
    },
  });

  const subscription = !session?.user
    ? undefined
    : await db.subscription.findFirst({
        where: {
          subreddit: {
            name: slug,
          },
          user: {
            id: session.user.id,
          },
        },
      });

  const isSubscribed = !!subscription;

  if (!subreddit) return notFound();

  const memberCount = await db.subscription.count({
    where: {
      subreddit: {
        name: slug,
      },
    },
  });

  return (
    <div className="sm:container max-w-7xl mx-auto h-full pt-12">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
          <ul className="flex flex-col col-span-2 space-y-6">{children}</ul>

          {/* info sidebar */}
          <div className="overflow-hidden h-fit rounded-lg border border-gray-200 order-first md:order-last">
            <div className="px-6 py-4">
              <p className="font-semibold py-3">About r/{subreddit.name}</p>
            </div>
            <dl className="divide-y divide-gray-100 px-6 py-4 text-sm leading-6 bg-white">
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">Created</dt>
                <dd className="text-gray-700">
                  <time dateTime={subreddit.createdAt.toDateString()}>
                    {format(subreddit.createdAt, "MMMM d, yyyy")}
                  </time>
                </dd>
              </div>

              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">Members</dt>
                <dd className="text-gray-700">
                  <div className="text-gray-900">{memberCount}</div>
                </dd>
              </div>

              {subreddit.creatorId === session?.user?.id ? (
                <div className="flex justify-between gap-x-4 py-3">
                    <p className="text-gray-500">You created this community</p>
                </div>
              ): null}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;