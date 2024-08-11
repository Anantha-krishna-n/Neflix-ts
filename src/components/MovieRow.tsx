import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MovieItem from './MovieItem';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

interface MovieRowProps {
  title: string;
  url: string;
}

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
}

const MovieRow: React.FC<MovieRowProps> = ({ title, url }) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const rowId = `row_${Math.random().toString(36).substring(2, 15)}_${Date.now()}`;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(url);
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [url]);

  const slide = (offset: number) => {
    const slider = document.getElementById(rowId);
    if (slider) {
      slider.scrollLeft += offset;
    }
  };

  return (
    <>
      <h2 className="font-sans-bold md:text-xl p-4 capitalize">{title}</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={() => slide(-500)}
          className="bg-white rounded-full absolute left-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
          size={40}
        />
        <div
          id={rowId}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          {movies.map((movie) => (
            <MovieItem key={movie.id} movie={movie} />
          ))}
        </div>
        <MdChevronRight
          onClick={() => slide(500)}
          className="bg-white rounded-full absolute right-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
          size={40}
        />
      </div>
    </>
  );
};

export default MovieRow;
