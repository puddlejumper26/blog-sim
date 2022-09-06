import type { NextPage } from 'next'
import Image from 'next/image'

import { PostCard, Categories, PostWidget } from '../components';


const posts = [
  { title: '1 Testing', excerpt: 'Initiate 1'},
  { title: '2 Testing', excerpt: 'Initiate 2'},
]

const Home: NextPage = () => {
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
  )
}

export default Home
