

import React from 'react'
import Hero from '../components/Hero'
import MovieRow from '../components/MovieRow'
import endpoints from '../services/movieServices'
const Home :React.FC= () => {
  return (
    <>
    <Hero/>
    <MovieRow title='upcomming' url={endpoints.upcoming}/>
    <MovieRow title='trending' url={endpoints.trending}/>
    <MovieRow title='top rated' url={endpoints.topRated}/>
    <MovieRow title='popular' url={endpoints.popular}/>
    <MovieRow title='comedy' url={endpoints.comedy}/>
    </>
  )
}

export default Home