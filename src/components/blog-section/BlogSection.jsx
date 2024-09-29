import { getDocs, collection, getFirestore} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { app } from "../../utils/firebase";

const db = getFirestore(app)

function BlogSection() {
  const [allBlogs, setBlogs ] = useState([])
  const [isLoading, setLoading] = useState([])
      useEffect(() => {
        const fetchProducts = async () => {
          setLoading(true);
          try {
            let allDocs = [];
            const querySnapshot = await getDocs(collection(db, "blogs"));
            querySnapshot.forEach((doc) => {
              allDocs.push({ _id: doc.id, ...doc.data() });
              setBlogs(allDocs);
            });
          } catch (err) {
            toast.error("Product could not be loaded");
          } finally {
            setLoading(false);
          }
        };
        fetchProducts();
      }, []);
  return (
    <article className="w-full h-full   ">
      <div className="grid m-4 grid-cols-2  lg:grid-cols-4 md:grid-cols-3 gap-4">
        {allBlogs.map((blog) => (
          <div
            key={blog.id}
            className=" card card-compact hover:scale-105 translate duration-100  bg-base-100 image-full w-full shadow-xl"
          >
            {/* <div className=" h-52 m"> */}
              <img
                className=" bg-center w-full "
                src={blog.bannerImage}
                alt={blog.title}
              />
            {/* </div> */}

            <div className="card-body">
              <h2 className="card-title text-white">{blog.title}</h2>
              <span className="text-white">Author | {blog.author}</span>
              <span className="text-white text-sm">{blog.date}</span>
              <div className="card-actions justify-end">
                <Link
                  to={`/blog/${blog.slug}`}
                  className="btn bg-red-500 rounded-md text-white"
                >
                  View Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

export default BlogSection