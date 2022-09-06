import Image from "next/image";

import { PostCard, Categories, PostWidget } from "../components";
import { getPosts } from "../services";

// const posts = [
//   { title: '1 Testing', excerpt: 'Initiate 1'},
//   { title: '2 Testing', excerpt: 'Initiate 2'},
// ]

export default function Home({ posts }) {
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post, index) => (
            <PostCard key={index} post={post} />
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
}

// This is the way to fetch data using getStaticProps in Next.js
export async function getStaticProps() {
  const posts = (await getPosts()) || [];

  return {
    props: { posts },
  };
}
