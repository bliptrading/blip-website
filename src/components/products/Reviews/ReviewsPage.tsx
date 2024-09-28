import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { LiaStarSolid } from "react-icons/lia";
import ReactStars from "react-stars";

import { IoArrowBack } from "react-icons/io5";
import {
  getDocs,
  collection,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "../../../utils/firebase";

const db = getFirestore(app);

export default function ReviewsPage() {
  const [isLoading, setLoading] = useState(true);
  const [reviewDetails, setReviewDetails] = useState();
  const [productReviews, setProductReviews] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const loc = useLocation();
  const itemPath = loc.pathname.split("/")[1];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true while fetching data
      try {
        const citiesRef = collection(db, "products");
        const q = query(citiesRef, where("slug", "==", itemPath));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          setCurrentProduct(doc.data()); // Save the current product details
          setProductReviews(doc.data().reviews || []); // Set reviews, default to empty array
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };
    fetchData();
  }, [itemPath]);

  return (
    <div className="w-full h-full">
      <section className="lg:m-12 lg:mt-12 rounded-md bg-white shadow-sm mx-1">
        <div className="card p-4 ">
          <div className="w-full flex">
            <Link className="font-light link-hover flex" to={-1}>
              <IoArrowBack className="mt-1" size={30} />
            </Link>
            <span className="mt-2 lg:text-xl flex flex-row font-light lg:mx-2">
              CUSTOMER REVIEWS AND FEEDBACK
            </span>
          </div>

          <hr />
          {isLoading ? (
            <div>Loading...</div> // Optional: Display a loading state
          ) : productReviews.length === 0 ? (
            <div>No Reviews</div> // Display this when there are no reviews
          ) : (
            productReviews.map((each, index) => (
              <div  key={index} className="w-full my-2">
                <div className="w-full flex p-1">
                  <ReactStars
                    size={25}
                    color2={"#ef4444"}
                    edit={false}
                    value={each.star}
                  />
                  <span className="text-sm ml-auto font-thin">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>

                <div className="w-full">
                  <span className="font-light text-gray-400 text-base">
                    {each.details}
                  </span>
                  <hr />
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
