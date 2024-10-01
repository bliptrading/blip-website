import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { app } from "../../utils/firebase";
import { getFirestore, query, where, getDocs, collection } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import ReactMarkdown from "react-markdown";

const db = getFirestore(app)

function BlogDetailsPage() {
   const [isLoading, setLoading] = useState(false)
   const loc = useLocation()
   let slug = loc.pathname.split('/')[2]
    const [currentBlog, setCurrentBlog] = useState([])


   useEffect(() => {

     const getComplexQuery = async () => {
       
         const q = query(collection(db, "blogs"), where("slug", "==", slug));
         try {
           let allDocs = [];
           const querySnapshot = await getDocs(q);
           querySnapshot.forEach((doc) => {
             allDocs.push(doc.data());
             
             setCurrentBlog(allDocs[0]);
           });
         } catch (error) {
           toast.error("Error fetching documents: ");
         } finally {
           setLoading(false);
         }
       
     };

     getComplexQuery();
   }, []);



  return (
    <>
      {/* Breadcrumb Section */}
      <div className=" py-4">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-sm text-gray-600">
            <ul className="flex space-x-2">
              <li>
                <a href="/" className="hover:text-gray-800">
                  Home
                </a>
              </li>
              <li>/</li>
              <li>
                <a href="/blog" className="hover:text-gray-800">
                  Blog
                </a>
              </li>
              <li>/</li>
              <li className="text-gray-800">Blog Details</li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Blog Content Section */}
      <div className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="md:flex md:space-x-6">
            {/* Blog Image */}
            <div className="md:w-1/3">
              {currentBlog.mediaUrl ? (
                <video
                  controls
                  src={currentBlog.mediaUrl}
                  alt="Blog Post"
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              ) : (
                <img
                  src={currentBlog.bannerImage}
                  alt="Blog Post"
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              )}
            </div>

            {/* Blog Details */}
            <div className="md:w-2/3">
              <h1 className="text-3xl roboto-thin font-medium text-gray-900 mb-4">
                {currentBlog.title}
              </h1>
              <div className="flex items-center space-x-4 text-gray-600 mb-6">
                <span>Admin</span>
                <span>|</span>
                <span>Published Date: {currentBlog.date}</span>
              </div>

              {/* Blog Content */}
              <div className="text-lg font-light text-gray-700 space-y-4 leading-relaxed">
                <ReactMarkdown children={`${currentBlog.data}`} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Interested in more articles like this?
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Subscribe to our newsletter for the latest updates.
          </p>
          <form className="flex space-x-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300  input input-bordered "
            />
            <button
              type="submit"
              className="bg-red-500 rounded-md btn text-white font-light text-xl"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default BlogDetailsPage;
