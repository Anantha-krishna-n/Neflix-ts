import axios from 'axios'
import React, { useEffect, useState } from 'react'
import endpoints, { createImageUrl } from '../services/movieServices'


interface Movie {
    id: number;
    title: string;
    overview: string;
    release_date: string;
  backdrop_path: string ; 
  }

  const Hero: React.FC = () => {
    const [movie, setMovie] = useState<Movie | null>(null);
  
    useEffect(() => {
      const fetchPopularMovie = async () => {
        try {
            const response = await axios.get(endpoints.popular);
            const movies = response.data.results;
            if (movies.length > 0) {
             
              const randomIndex = Math.floor(Math.random() * movies.length);
              setMovie(movies[randomIndex]);
            } else {
              console.error('No movies found');
            }
          } catch (error) {
            console.error('Error fetching popular movies:', error);
          }
        };
  
      fetchPopularMovie();
    }, []);

      const truncate = (str: string, length: number): string => {
    if (!str) return '';
    return str.length > length ? str.slice(0, length) + '...' : str;
  };
  
    if (!movie) {
      return <div>Loading...</div>;
    }
  
  return (
    <div className="w-full h-[550px] lg:h-[850px]">
        <div className="w-full h-full">
            <div className="absolute w-full h-[550px] lg:h-[850px] bg-gradient-to-r from-black" > </div >
          
            <img 
            src={createImageUrl(movie.backdrop_path, "original")}
            alt={movie.title} 
          className='w-full h-full object-cover object-top'
        />
            <div className='absolute w-full top-[10%] lg:top-[25%] p-4 md:p-8'>
                <h1 className='text-3xl md:text-6xl font-nsans-bold'>{movie.title}</h1>
                <div className='mt-8 mb-4'>
                    <button className='capitalize border bg-gray-300 text-black py-2 px-5'>play</button>
                    <button className='capitalize border bg-gray-300 py-2 px-5 ml-4  '>watch later</button>
                </div>
                <p>{movie.release_date}</p>
                <p className='w-full md:max-w-[70%] xl:max-w-[35%] text-gray-200'>{truncate(movie.overview, 165)}</p>
            </div>


        </div>
    </div>
  )
}

export default Hero