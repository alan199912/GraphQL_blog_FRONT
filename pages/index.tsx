import React from "react";
import { PostCard, PostWidget, Categories } from "../components";
import { getPosts } from "../services";
import { Post } from "../interfaces/post";

const Home = ({ posts }: any): JSX.Element => {
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post: Post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const posts = (await getPosts()) || [];
  console.log(posts);
  return {
    props: { posts },
  };
}

export default Home;
