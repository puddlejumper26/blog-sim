import React from "react";
import {
  PostDetail,
  Categories,
  PostWidget,
  Author,
  Comments,
  CommentsForm,
} from "../../components";
import { getPosts, getPostDetails } from "../../services";

const PostDetails = ({ post }) => {
  return (
    <>
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
              <PostWidget
                slug={post.slug}
                categories={post.categories.map((c) => c.slug)}
              />
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetails;

// Fetch data at build time
export async function getStaticProps({ params }) {
  // console.log(5555, params);

  const data = await getPostDetails(params.slug);
  // console.log(7777, data);
  return {
    props: {
      post: data,
    },
  };
}

// in next.js in order to have dynamic routes, getStaticPaths is necessary
// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
// next js would know all the possible paths
export async function getStaticPaths() {
  const posts = await getPosts();
  console.log(
    6666,
    posts.map(({ node: { slug } }) => ({ params: { slug: slug } }))
  );
  return {
    //obtain a specific post by destructuring the node, further destructuring the slug
    paths: posts.map(({ node: { slug } }) => ({ params: { slug: slug } })),
    fallback: false,
  };
}
