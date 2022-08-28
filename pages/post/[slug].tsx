import React from "react";

import { getPosts, getPostsDetails } from "../../services";
import {
  Author,
  Categories,
  Comments,
  CommentsForm,
  PostDetail,
  PostWidget,
} from "../../components";
import { Post, PropsPost } from "../../interfaces/post";

const PostDetails = ({ post }: PropsPost) => {
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail post={post} />
          <Author author={post.author} />
          <CommentsForm slug={post.slug} />
          <Comments slug={post.slug} />
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <PostWidget slug={post.slug} />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;

export async function getStaticProps({ params }: any) {
  console.log;
  const post = await getPostsDetails(params.slug);
  return {
    props: { post },
  };
}

export async function getStaticPaths() {
  const posts = await getPosts();
  return {
    paths: posts.map((post: Post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  };
}
