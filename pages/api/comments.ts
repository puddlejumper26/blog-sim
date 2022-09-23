/** *************************************************************
* Any file inside the folder pages/api is mapped to /api/* and  *
* will be treated as an API endpoint instead of a page.         *
*************************************************************** */

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from 'next'

// type Data = {
//   name: string
// }

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   res.status(200).json({ name: 'John Doe' })
// }

import  {GraphQLClient, gql} from 'graphql-request'
import { request } from 'http'

const GraphQLAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

export default async function comments(req, res) {
    const {name, email, slug, comment} = req.body

    // second parameter is to pass the option object
    const graphQLClient = new GraphQLClient(GraphQLAPI,{
        headers: {
            authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`
        } 
    })

    // mutation in GraphQL, means changing or adding data
    // connect : to connect name, email, comment to a special post
    const query = gql`
        mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug:String!){
            createComment(data: {name: $name, email:$email, comment:$comment, post:{connect: {slug: $slug}}}){id}
        }
    `

    const result = await graphQLClient.request(query, req.body)

    return res.status(200).send(result)
}