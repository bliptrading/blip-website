import React from "react";

function BlogDetailsPage() {
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
              <img
                src="https://via.placeholder.com/600"
                alt="Blog Post"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>

            {/* Blog Details */}
            <div className="md:w-2/3">
              <h1 className="text-3xl roboto-thin font-medium text-gray-900 mb-4">
                Blog Title
              </h1>
              <div className="flex items-center space-x-4 text-gray-600 mb-6">
                <span>Author Name</span>
                <span>|</span>
                <span>Published Date: September 23, 2024</span>
              </div>

              {/* Blog Content */}
              <div className="text-lg font-light text-gray-700 space-y-4 leading-relaxed">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <p>
                  Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                  aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur.
                </p>
                <p>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id est laborum.
                </p>
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
    </>
  );
}

export default BlogDetailsPage;
