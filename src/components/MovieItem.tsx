import React, { useState } from 'react'
import { createImageUrl } from '../services/movieServices';
import { FaHeart,FaRegHeart } from "react-icons/fa";
import { arrayUnion,doc,updateDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { db } from '../services/fireBase';
interface MovieItemProps {
    movie: {
      id: number;
      title: string;
      poster_path: string;
      backdrop_path: string;
      overview: string;
      release_date: string;
    };
  }

  const MovieItem: React.FC<MovieItemProps> = ({ movie }) => {
  const [like, setLike] = useState<boolean>(false);    
  const { user } = useAuth();

  const markFavShow = async () => {
    const userEmail = user?.email;
    if (userEmail) {
      const userDoc = doc(db, 'users', userEmail);
      setLike(!like);
      await updateDoc(userDoc, {
        favShows: arrayUnion({ ...movie })
      });
    } else {
      alert("Login to save movie");
    }
}

    return (
      <div className='relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2'>
        <img
          src={createImageUrl(movie.backdrop_path ?? movie.poster_path)}
          alt={movie.title}
          className='w-full h-40 block object-cover object-top'
        />
        <div className='absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-100'>
        <p className='whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-nsans-bold'>{movie.title}</p>
        <p onClick={markFavShow} className="cursor-pointer">
            {like ? (
              <FaHeart
                size={20}
                className="absolute top-2 left-2 text-red-500"
              />
            ) : (
              <FaHeart
                size={20}
                className="absolute top-2 left-2 text-grey-300 "
              />
            )}
          </p>
        </div>
      </div>
    );
  };
  export default MovieItem;
