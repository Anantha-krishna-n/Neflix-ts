
import React, { useEffect, useState } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { AiOutlineClose } from 'react-icons/ai'
import { useAuth } from '../context/AuthContext'
import { db } from '../services/fireBase'
import { createImageUrl } from '../services/movieServices'
import { arrayRemove,doc,onSnapshot,updateDoc } from 'firebase/firestore'

interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
}


const Profile = () => {
  const [movies,Setmovies]=useState<Movie[]>([]);
  const {user}=useAuth();

  useEffect(() => {
    if (user) {
      
      const unsubscribe = onSnapshot(doc(db, 'users', `${user.email}`), (doc) => {
        if (doc.exists()) {
          console.log("Document data:", doc.data());  
          const favShows = doc.data()?.favShows || [];
          console.log("Favorite Shows Array:", favShows);
          Setmovies(favShows as Movie[]);
        } else {
          console.log("No such document!");
        }
      });

      return () => unsubscribe();
    }
  }, [user?.email]);

  const slide = (offset: number) => {
    const slider = document.getElementById('slider');
    if (slider) {
      slider.scrollLeft += offset;
    }
  };

  const handleClose = async (movie: Movie) => {
    if (user) {
      const userDoc = doc(db, 'users', user.email as string);
      await updateDoc(userDoc, {
        favShows: arrayRemove(movie),
      });
    }
  };

  console.log(movies);

  if (!user) {
    return (
      <div className="profile flex items-center justify-center h-screen">
        <div className="text-center">Please Login</div>
      </div>
    );
  }
  console.log(movies, 'movie');
  return (
<>
      <div>
        <img
          className="block w-full h-[500px] object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/c31c3123-3df7-4359-8b8c-475bd2d9925d/15feb590-3d73-45e9-9e4a-2eb334c83921/IN-en-20231225-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="img"
        />
        <div className="bg-black/60 fixed top-0 left-0 w-full h-[500px]">
          <div className="absolute top-[20px] p-4 md:p-8">
            <h1 className=" text-2xl pt-3 md:text-5xl font-nsans-bold my-2">My Shows</h1>
            <p className="font-nsans-Light text-lg">{user.email}</p>
          </div>
        </div>
        {/* movie row */}
        <h2 className="font-nsans-bold md:text-xl p-4 capitalize">Fav Shows</h2>

        <div className="relative flex items-center w-full group">
          <MdChevronLeft
            onClick={() => slide(-500)}
            className="rounded-full bg-white text-black left-2 opacity-80 ml-1 z-20 cursor-pointer"
            size={40}
          />
          <div
            id="slider"
            className="w-full overflow-x-auto whitespace-nowrap scroll-smooth scrollbar-hide"
          >
            {movies.map((movie: Movie) => {
              const imageUrl = createImageUrl(movie.backdrop_path ?? movie.poster_path, 'original');
              console.log("Movie Title:", movie.title, "Image URL:", imageUrl); // Log each movie's title and image URL

              return (
                <div
                  key={movie.id}
                  className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2"
                >
                  <img
                    className="w-full block object-cover h-40"
                    src={imageUrl}
                    alt={movie.title}
                  />

                  <div className="absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-100">
                    <p className="whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-nsans-bold">
                      {movie.title}
                    </p>
                    <p>
                      <AiOutlineClose
                        onClick={() => handleClose(movie)}
                        className="absolute top-2 right-2 cursor-pointer"
                        size={20}
                      />
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <MdChevronRight
            onClick={() => slide(500)}
            className="rounded-full bg-white text-black right-2 opacity-80 ml-1 z-20 cursor-pointer"
            size={40}
          />
        </div>
      </div>
    </>
      )
}

export default Profile