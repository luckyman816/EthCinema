"use client";

import React, { useEffect, useState, useContext, use } from "react";
import Image from "next/image";
import AuthContext from "../../utils/AuthContext";
import { Rating, ThinRoundedStar } from "@smastrom/react-rating";
import Jazzicon from "react-jazzicon/dist/Jazzicon";
import { toast } from "react-toastify";

let user = require("../../asset/user.png");

const includedShapesStyles = [ThinRoundedStar].map((itemShapes) => ({
  itemShapes,
  activeFillColor: "#f59e0b",
  inactiveFillColor: "#ffedd5",
}));

export const ReviewComp = ({ moviedetails, isReview, setIsReview }) => {
  const { isLogged, contract, address } = useContext(AuthContext);

  const [Review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  
  const [popup, setPopup] = useState(false);

  const [userReviews, setUserReviews] = useState([]);

  const reviewposthandler = async () => {
    if (isLogged) {
      toast.promise(
        contract
          .rateMovie(moviedetails.id, Review, rating, address)
          .then((res) => {
            setIsReview(true);
          })
          .catch((err) => {
            toast.error("Something went wrong!");
            console.log("error while postreview ", err);
          }),
        {
          pending: "posting review...",
          success: "Review posted successfully! 🎉",
          error: "Something went wrong 😕",
        }
      ); 
    } else {
      toast.error("Please connect your wallet");
    }
  };

  useEffect(() => {
    async function getmoviereviews() {
      const res = await contract.GetMovieReviews(moviedetails.id);
      if (res) {
        setUserReviews(res);
      } else {
        toast("Something went wrong!");
        console.log("error while getmoviereviews ", err);
      }
    }
    
    if (contract != null && moviedetails != undefined) {
      getmoviereviews();
    }
  }, [contract, moviedetails]);

  const addreviewhandler = async () => {
    if (isLogged) {
      const body = document.querySelector("body");
      body.style.overflow = "hidden";
      setPopup(true);
    }
    else {
      toast.error("Please connect your wallet");
    }
  };
  
  const closePopupHandle = () => {
    setPopup(false);
    const body = document.querySelector("body");
    body.style.overflow = "auto";
  };
  
  
  return (
    <>
      <div className={`md:container mx-auto px-4 py-1 ${popup && "overflow-hidden"}`}>
        <div className="flex justify-between items-center">
          <h2 className="my-3 text-4xl font-semibold flex">
            <div className="mr-3 w-1 bg-yellow-400"></div> User reviews
          </h2>
          <div className="flex justify-center">
            {
              !isReview && 
                <button 
              className=" text-white bg-transparent border border-gray-600 py-3 px-5 rounded-lg transition-colors"
              onClick={addreviewhandler}
            >
            <span className="flex">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Review
              </span>
            </button>      
            }
            
          </div>
        </div>
        
        {/* add review popup model */}
        {popup && (
         <>
         <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
          
          <div className="w-full h-full z-10 absolute" onClick={closePopupHandle}></div>
          {/* open popup with transform */}
          <div className="px-8 py-4 bg-gray-700 z-20 rounded-lg overflow-hidden shadow-black ">  
            <div className="flex justify-center items-center px-5 py-3">
              <h2 className="text-2xl font-semibold flex">
                What is your rating?
              </h2>
            </div>
            <div className="flex flex-col justify-center items-center px-5 py-3">
              <div style={{ maxWidth: 380, width: "100%" }}>
                {includedShapesStyles.map((itemStyles, index) => (
                  <Rating
                    key={`shape_${index}`}
                    value={rating}
                    onChange={setRating}
                    itemStyles={itemStyles}
                    items={10}
                    spaceBetween="small"
                  />
                ))}
              </div>
              
              <div className="flex justify-center items-center mx-5 my-3 w-full">
                <textarea
                  className="w-full h-32 bg-transparent border border-white mx-2 mt-3 rounded-lg p-3 "
                  placeholder="Write your review here..."
                  value={Review}
                  onChange={(e) => setReview(e.target.value)}
                ></textarea>
              </div>
              
              <div className="flex justify-end items-center mr-6 my-3 w-full">
                <button
                  className="text-white bg-transparent border border-gray-600 py-3 px-5 rounded-lg transition-colors mr-3"
                  onClick={closePopupHandle}
                >
                  Cancel
                </button>
                <button
                  className="text-white bg-blue-600 py-3 px-5 rounded-lg transition-colors"
                  onClick={reviewposthandler}
                >
                  Post
                </button>
              </div>
            </div>        
            </div>  
            
         </div>
         </> 
        )}
        
        {/* {!isReview && (
          <div className="container border border-gray-600 px-5 py-5 rounded-lg">
            <div className="flex items-center space-x-4">
              {!address ? (
                <Image
                  className="w-10 h-10 rounded-full"
                  src={user}
                  alt="user pfp"
                />
              ) : (
                <Jazzicon
                  diameter={40}
                  seed={parseInt(address && address.slice(2, 10), 16)}
                />
              )}
              <div className="space-y-1 font-medium dark:text-white">
                <p>
                  You
                  <span className="block text-sm text-gray-500 dark:text-gray-400">
                    Posting publicly
                  </span>
                </p>
                <div style={{ maxWidth: 280, width: "100%" }}>
                  {includedShapesStyles.map((itemStyles, index) => (
                    <Rating
                      key={`shape_${index}`}
                      value={rating}
                      onChange={setRating}
                      itemStyles={itemStyles}
                      items={10}
                      spaceBetween="small"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-start items-start ml-14 mb-3 space-x-4">
              <div className="flex flex-col items-start w-3/4 mt-5">
                <textarea
                  id="comment"
                  rows="4"
                  className="w-10/12 bg-transparent p-3 border border-gray-600 rounded-lg"
                  placeholder="Write your review here..."
                  value={Review}
                  onChange={(e) => setReview(e.target.value)}
                ></textarea>
                <button
                  className="mt-5 w-1/3 text-center font-bold text-base bg-blue-700 px-5 py-3 rounded-lg text-white hover:bg-blue-800"
                  onClick={reviewposthandler}
                >
                  Post Review
                </button>
              </div>
            </div>
          </div>
        )} */}

        {/* other user reviews */}
        <div>
          {userReviews && userReviews.length > 0 ? (
            userReviews.map((review, key) => (
              <article
                className="my-5 border border-gray-600 px-5 py-5"
                key={key}
              >
                <div className="flex justify-between items-center mb-3 space-x-4">
                  <div className="flex items-center space-x-4">
                    {/* <Image
                      className="w-10 h-10 rounded-full"
                      src={user}
                      alt=""
                    /> */}
                    <Jazzicon
                      diameter={40}
                      seed={parseInt(review.useraddress.slice(2, 10), 16)}
                    />
                    <div className="space-y-1 font-medium dark:text-white">
                      <p>
                        {review.useraddress.slice(0, 6) +
                          "..." +
                          review.useraddress.slice(-4)}
                        <time
                          dateTime="2014-08-16 19:00"
                          className="block text-sm text-gray-500 dark:text-gray-400"
                        >
                          {review.timestamp}
                        </time>
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center text-sm text-gray-200 pr-4">
                      <svg
                        className="fill-current text-yellow-400 w-4"
                        viewBox="0 0 24 24"
                      >
                        <g data-name="Layer 2">
                          <path
                            d="M17.56 21a1 1 0 01-.46-.11L12 18.22l-5.1 2.67a1 1 0 01-1.45-1.06l1-5.63-4.12-4a1 1 0 01-.25-1 1 1 0 01.81-.68l5.7-.83 2.51-5.13a1 1 0 011.8 0l2.54 5.12 5.7.83a1 1 0 01.81.68 1 1 0 01-.25 1l-4.12 4 1 5.63a1 1 0 01-.4 1 1 1 0 01-.62.18z"
                            data-name="star"
                          ></path>
                        </g>
                      </svg>
                      <span className="ml-1">{parseInt(review.rate)} / 10</span>
                    </div>
                  </div>
                </div>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  {review.comment}
                </p>
              </article>
            ))
          ) : (
            <div className="flex justify-center items-center my-5">
              <h1 className="text-4xl font-semibold">No Reviews Yet</h1>
            </div>
          )}
        </div>

        {userReviews && userReviews.length > 0 && (
          <div className="flex justify-center">
            <button className=" text-white bg-transparent border border-gray-600 py-3 px-10 rounded-lg transition-colors">
              <span>View More</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
};
