import React from 'react'
import GetTask from '../components/GetTask'


const Home = () => {
  return (
    <div className='flex gap-12 mt-12'>
      <h1 class="text-6xl font-bold underline m-80]">
        Hello world!
      </h1>
      <div>
        <GetTask />
      </div>
    </div>
  )
}

export default Home