import React, { useEffect } from 'react'
import axios from 'axios'

const SingleMovieComp = ({movieid}) => {
    
    const [moviedetails, setMoviedetails] = React.useState(null);

    const fetchData = async () => {
        const url = `https://api.themoviedb.org/3/movie/${movieid}?api_key=${process.env.THEMOVIEDB_API_KEY}&language=en-US&page=1`;
        await axios
          .get(url)
          .then((res) => {
            console.log("got it");
            setMoviedetails(res.data);
          })
          .catch((err) => {
            console.log("catch error:-", err);
          });
      };
      useEffect(() => {
        fetchData();
      }, []);
      console.log("moviedata:-", moviedetails);

    return (
        <>
        <div>

            
            <div className="movie-info border-b border-gray-800">
            <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row">
            <div className="flex-none">
                <img src={`https://image.tmdb.org/t/p/w500/${moviedetails && moviedetails.poster_path}`} alt="poster" className="w-64 lg:w-96" />
            </div>
            <div className="md:ml-24">
                <h2 className="text-4xl mt-4 md:mt-0 font-semibold">{moviedetails && moviedetails.title}</h2>
                <div className="flex flex-wrap items-center text-gray-400 text-sm pt-3">
                    <svg className="fill-current text-orange-500 w-4" viewBox="0 0 24 24"><g data-name="Layer 2"><path d="M17.56 21a1 1 0 01-.46-.11L12 18.22l-5.1 2.67a1 1 0 01-1.45-1.06l1-5.63-4.12-4a1 1 0 01-.25-1 1 1 0 01.81-.68l5.7-.83 2.51-5.13a1 1 0 011.8 0l2.54 5.12 5.7.83a1 1 0 01.81.68 1 1 0 01-.25 1l-4.12 4 1 5.63a1 1 0 01-.4 1 1 1 0 01-.62.18z" data-name="star"></path></g></svg>
                    <span className="ml-1">{moviedetails && moviedetails.vote_average.toFixed(2) * 10}%</span>
                    <span className="mx-2">|</span>
                    <span>{moviedetails && moviedetails.release_date}</span>
                    <span className="mx-2">|</span>
                    <span>{moviedetails && moviedetails.runtime} min</span>
                    <span className="mx-2">|</span>
                    <span>{moviedetails && moviedetails.genres.map((genre, index) => (
                        <span key={index}>{genre.name} {index === moviedetails.genres.length - 1 ? '' : ', '}</span>
                    ))}</span>

                </div>

                <p className="text-gray-300 mt-4">
                    {moviedetails && moviedetails.overview}
                </p>

                {/* <div className="mt-12">
                    <h4 className="text-white font-semibold">Featured Crew</h4>
                    <div className="flex mt-4">
                        <div className="mr-8">
                                <div>Sarah Halley Finn</div>
                                <div className="text-sm text-gray-400">Casting</div>
                            </div>

                                                    <div className="mr-8">
                                <div>Stan Lee</div>
                                <div className="text-sm text-gray-400">Characters</div>
                            </div>

                                            </div>
                </div> */}

                <div >
                    <div className="mt-12">
                            <button className="inline-flex items-center bg-orange-500 text-gray-900 rounded font-semibold px-5 py-4 hover:bg-orange-600 transition ease-in-out duration-150">
                                <svg className="w-6 fill-current" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"></path><path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></svg>
                                <span className="ml-2">Play Trailer</span>
                            </button>
                        </div>
                        </div>
            </div>
        </div>
            </div>

            {/* cast */}
            <div className="movie-cast border-b border-gray-800">
            <div className="container mx-auto px-4 py-16">
            <h2 className="text-4xl font-semibold">Cast</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                                    <div className="mt-8">
                        <a href="https://movies.andredemos.ca/actors/22226">
                            <img src="https://image.tmdb.org/t/p/w300/8eTtJ7XVXY0BnEeUaSiTAraTIXd.jpg" alt="actor1" className="hover:opacity-75 transition ease-in-out duration-150" />
                        </a>
                        <div className="mt-2">
                            <a href="https://movies.andredemos.ca/actors/22226" className="text-lg mt-2 hover:text-gray:300">Paul Rudd</a>
                            <div className="text-sm text-gray-400">
                                Scott Lang / Ant-Man
                            </div>
                        </div>
                    </div>
                                    <div className="mt-8">
                        <a href="https://movies.andredemos.ca/actors/19034">
                            <img src="https://image.tmdb.org/t/p/w300/fRbXVt9fhz6ndPhF1lRA92VxUDk.jpg" alt="actor1" className="hover:opacity-75 transition ease-in-out duration-150" />
                        </a>
                        <div className="mt-2">
                            <a href="https://movies.andredemos.ca/actors/19034" className="text-lg mt-2 hover:text-gray:300">Evangeline Lilly</a>
                            <div className="text-sm text-gray-400">
                                Hope van Dyne / The Wasp
                            </div>
                        </div>
                    </div>
                                    <div className="mt-8">
                        <a href="https://movies.andredemos.ca/actors/1674162">
                            <img src="https://image.tmdb.org/t/p/w300/nsxnMbkl9Lpc12AmYwKi9SmsJ7e.jpg" alt="actor1" className="hover:opacity-75 transition ease-in-out duration-150" />
                        </a>
                        <div className="mt-2">
                            <a href="https://movies.andredemos.ca/actors/1674162" className="text-lg mt-2 hover:text-gray:300">Jonathan Majors</a>
                            <div className="text-sm text-gray-400">
                                Kang the Conqueror
                            </div>
                        </div>
                    </div>
                                    <div className="mt-8">
                        <a href="https://movies.andredemos.ca/actors/221192">
                            <img src="https://image.tmdb.org/t/p/w300/hEz2R1RTgaNznJ3fa9n3KabIXYl.jpg" alt="actor1" className="hover:opacity-75 transition ease-in-out duration-150" />
                        </a>
                        <div className="mt-2">
                            <a href="https://movies.andredemos.ca/actors/221192" className="text-lg mt-2 hover:text-gray:300">Kathryn Newton</a>
                            <div className="text-sm text-gray-400">
                                Cassie Lang
                            </div>
                        </div>
                    </div>
                                    <div className="mt-8">
                        <a href="https://movies.andredemos.ca/actors/1160">
                            <img src="https://image.tmdb.org/t/p/w300/oGUmQBU87QXAsnaGleYaAjAXSlj.jpg" alt="actor1" className="hover:opacity-75 transition ease-in-out duration-150" />
                        </a>
                        <div className="mt-2">
                            <a href="https://movies.andredemos.ca/actors/1160" className="text-lg mt-2 hover:text-gray:300">Michelle Pfeiffer</a>
                            <div className="text-sm text-gray-400">
                                Janet van Dyne
                            </div>
                        </div>
                    </div>
                            </div>
        </div>
            </div>
        </div>
        </>
        )
}
export default SingleMovieComp




export const getmovieimg = async ({movieid}) => {
    const [test,settest] = React.useState(null)

    const fetchData = async () => {
        const url = `https://api.themoviedb.org/3/movie/${movieid}/images?api_key=${process.env.THEMOVIEDB_API_KEY}&language=en-US&include_image_language=en`;
        await axios
          .get(url)
          .then((res) => {
            console.log("got it");
            settest(res.data)
          })
          .catch((err) => {
            console.log("catch error:-", err);
          });
      };
      useEffect(() => {
        fetchData();
      }, []);
  
    return (
    <>
        <h1>jdhj</h1>
      {test && test.backdrops.map((movie,key) =>
            <>
            <img src={`https://image.tmdb.org/t/p/w1280/${movie.file_path}`} alt="movie poster" className="" key={key}/>
            </>
        )}
          
    </>
  )
}
