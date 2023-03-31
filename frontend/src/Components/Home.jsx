import React, { useContext } from 'react'
import { Context } from '../context/Context'

const Home = () => {
    const {token} = useContext(Context)
  return (
    <p className='text-red-500 font-medium'>Tailwind {token}</p>
  )
}

export default Home