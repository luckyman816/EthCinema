import { MovieCard } from "./MovieCard";
import { useEffect, useState } from "react";
import Image from "next/image";
import MovieCarousel, { SeriesCarousel } from "./layout/MovieCarousel";
import { HomeCarouselLoding, SearchLoding } from "./Loding";
import { toast } from "react-toastify";

const noresultimg = require("../asset/noresult.png");

const HomeMovieList = ({ moviedata, Loading, setLoading, setMovieSort }) => {
  return (
    <>
      {moviedata && moviedata.total_results !== 0 && (
        <div>
          <MovieCarousel
            moviedata={moviedata}
            Loading={Loading}
            setLoading={setLoading}
            setMovieSort={setMovieSort}
          />
        </div>
      )}
    </>
  );
};

export default HomeMovieList;

export const HomeSeriesList = ({ seriesdata, Loading }) => {
  return (
    <>
      {Loading ? (
        <HomeCarouselLoding />
      ) : (
        seriesdata &&
        seriesdata.total_results !== 0 && (
          <div>
            <SeriesCarousel seriesdata={seriesdata} Loading={Loading} />
          </div>
        )
      )}
    </>
  );
};

export const SearchMovieList = ({
  searchtext,
  searchmoviedata,
  setsearchMoviedata,
}) => {
  
  const [searchLoading, setSearchLoading] = useState(true);
  const [sortoption, setSortoption] = useState("movie");

  useEffect(() => {
    const fetchsearchData = async () => {
      let urlencode = encodeURI(searchtext);
      const url = `https://api.themoviedb.org/3/search/${sortoption}?api_key=${process.env.THEMOVIEDB_API_KEY}&page=1&query=${urlencode}&limit=10`;

      const res = await fetch(url);

      if (!res.ok) {
        toast("Something went wrong!");
        console.error("Failed to fetch data");
      }
      const data = await res.json();
      setsearchMoviedata(data);
      setSearchLoading(false);
    };
    fetchsearchData();
  }, [searchtext, setsearchMoviedata, sortoption]);


  const handlemovie = () => {
    setSortoption("movie");
    setSearchLoading(true);
  };
  const handleseries = () => {
    setSortoption("tv");
    setSearchLoading(true);
  };

  return (
    <>
      <div className="flex justify-center">
      <div className="border rounded-full border-gray-700">
        <button
          className={`px-12 py-3 rounded-full ${
            sortoption == "movie" && "bg-gray-700"
          }`}
          onClick={handlemovie}
          >
          Movies
        </button>
        <button
          className={`px-12 py-3 rounded-full ${
            sortoption == "tv" && "bg-gray-700"
          }`}
          onClick={handleseries}
          >
          Series
        </button>
          </div>
      </div>  
      <h1 className="my-10 text-5xl font-bold text-center">
        Search Movies For {searchtext}
      </h1>
    
      {searchLoading ? (
        <SearchLoding />
      ) : searchmoviedata && searchmoviedata.total_results !== 0 ? (
        <div className="gap-x-10 gap-y-10 mx-20 grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2">
          {searchmoviedata &&
            searchmoviedata.results &&
            searchmoviedata.results.map((movie, key) =>
              movie.poster_path === null ? null : (
                <MovieCard key={key} movie={movie} sortoption={sortoption} />
              )
            )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <Image src={noresultimg} alt="no result" className="w-96 h-96" />
          <h1 className="text-3xl font-bold">No Result Found</h1>
        </div>
      )}
    </>
  );
};
