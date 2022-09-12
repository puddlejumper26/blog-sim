# Next.js + Tailwind CSS Example

## Deploy your own

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example) or preview live with [StackBlitz](https://stackblitz.com/github/vercel/next.js/tree/canary/examples/with-tailwindcss)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-tailwindcss&project-name=with-tailwindcss&repository-name=with-tailwindcss)

## Step to create this repo

- `npx create-next-app -e with-tailwindcss ./`
- `npm install graphql graphql-request html-react-parser moment react-multi-carousel sass`

## APIs / Notes

- `getStaticProps` - Next.js
- - When to use?
- - - The data comes from a headless CMS

- `getStaticPaths` - Next.js
- - When to use?
- - - The data comes from a headless CMS / database / fileSystem
- - - The page must be pre-rendered (for SEO)
- - will only run during build in production, it will not be called during runtime

```js
// pages/posts/[id].js

// Generates `/posts/1` and `/posts/2`
export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "1" } }, { params: { id: "2" } }],
    fallback: false, // can also be true or 'blocking'
  };
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context) {
  return {
    // Passed to the page component as props
    props: { post: {} },
  };
}

export default function Post({ post }) {
  // Render post...
}
```
