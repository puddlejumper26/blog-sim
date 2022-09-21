import { request, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImg {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query);
  return result.postsConnection.edges;
};

export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetailsOne {
      posts(orderBy: createdAt_ASC, last: 3) {
        title
        featuredImg {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const result = await request(graphqlAPI, query);
  return result.posts;
};

// Note the way how to pass the parameters in GraphQL
// where ==> means do not display $slug value parameter, which is the current one but to display the related ones
export const getSimilarPosts = async (categories, slug) => {
  const query = gql`
    query GetPostDetailsTwo($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        featuredImg {
          url
        }
        createdAt
        slug
      }
    }
  `;
  //  note here the content inside of { }, is the parameter passed in
  const result = await request(graphqlAPI, query, { slug, categories });

  return result.posts;
};

export const getCategories = async () => {
  const query = gql`
    query GetGategories {
      categories {
        name
        slug
      }
    }
  `;

  const result = await request(graphqlAPI, query);

  return result.categories;
};

// only needs to obtain certain post,
export const getPostDetails = async (newSlug) => {
  const query = gql`
    query GetPostDetailsThree($newSlug: String!) {
      post(where: { slug: $newSlug }) {
        author {
          bio
          name
          id
          photo {
            url
          }
        }
        createdAt
        slug
        title
        excerpt
        featuredImg {
          url
        }
        categories {
          name
          slug
        }
        content {
          raw
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { newSlug });

  return result.post;
};
/**
 *
 * obtain data from current project, that is one of the merits from Nextjs
 * http request methods to this current project, nextjs backend
 * there is no need to have a separate node server
 *
 * graphCMS allows our own backend to interact with service to actually submit a comment to graphCMS,
 * and then we could see/manage it directly from the graphCMS dashboard
 */
export const submitComment = async (obj) => {
  const result = await fetch("/api/comments", {
    method: "POST",
    body: JSON.stringify(obj),
  });
  return result.json();
};
