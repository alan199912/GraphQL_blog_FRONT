import React, { useEffect, useState } from "react";
import moment from "moment";
import Link from "next/link";
import { Post, PropsPost } from "../interfaces/post";
import { getRecentPosts, getSimilarPosts } from "../services";

const PostWidget = ({ slug }: any): JSX.Element => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (slug) {
      getSimilarPosts(slug).then((relatedPosts) =>
        setRelatedPosts(relatedPosts)
      );
    } else {
      getRecentPosts().then((result) => setRelatedPosts(result));
    }
  }, [slug]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        {slug ? "Related Posts" : "Recent Posts"}
      </h3>
      {relatedPosts.length > 0
        ? relatedPosts.map((post: Post) => (
            <div key={post.id} className="flex items-center w-full mb-4">
              <div className="w-16 flex-none">
                <img
                  src={post.featuredImage.url}
                  alt={post.title}
                  width="60px"
                  height="60px"
                  className="align-middle rounded-full"
                />
              </div>
              <div className="flex-grow ml-4">
                <p className="text-gray-500 font-xs">
                  {moment(new Date(+post.createdAt)).format("DD MMM, YYYY")}
                </p>
                <Link href={`/post/${post.slug}`} className="text-md">
                  {post.title}
                </Link>
              </div>
            </div>
          ))
        : "No recents posts"}
    </div>
  );
};

export async function getStaticProps() {
  const posts = (await getRecentPosts()) || [];
  console.log(posts);
  return {
    props: { posts },
  };
}

export default PostWidget;
