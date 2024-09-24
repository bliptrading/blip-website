import { getDocs, collection, getFirestore} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { app } from "../../utils/firebase";

const db = getFirestore(app)

  const blogs = [
    {
      id: 1,
      title: "Welcome to your 1 stop shop ",
      description: "If a dog chews shoes whose shoes does he choose?",
      imageUrl:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    },
    {
      id: 2,
      title: "Exploring the Mountains",
      description: "A journey through the breathtaking peaks and valleys.",
      imageUrl:
        "https://img.daisyui.com/images/stock/photo-1518837695005-3c1b9e1556c3.webp",
    },
    {
      id: 3,
      title: "The Beauty of Nature",
      description: "Discover the wonders of nature and its beauty.",
      imageUrl:
        "https://img.daisyui.com/images/stock/photo-1506748686214-e9df14d4d9d0.webp",
    },
    {
      id: 4,
      title: "Technology in Daily Life",
      description: "How technology shapes our everyday experiences.",
      imageUrl:
        "https://img.daisyui.com/images/stock/photo-1517436078-bl7z7e8f4e9f.webp",
    },
    {
      id: 5,
      title: "Healthy Living",
      description: "Tips and tricks for maintaining a healthy lifestyle.",
      imageUrl:
        "https://img.daisyui.com/images/stock/photo-1506748686214-e9df14d4d9d0.webp",
    },
    {
      id: 6,
      title: "Traveling the World",
      description: "Experience different cultures and traditions.",
      imageUrl:
        "https://img.daisyui.com/images/stock/photo-1506748686214-e9df14d4d9d0.webp",
    },
    {
      id: 7,
      title: "Cooking Delicious Meals",
      description: "Simple recipes for delicious home-cooked meals.",
      imageUrl:
        "https://img.daisyui.com/images/stock/photo-1514516873927-a3a1f7e0f2a2.webp",
    },
    {
      id: 8,
      title: "Mindfulness and Meditation",
      description: "Finding peace in a chaotic world through mindfulness.",
      imageUrl:
        "https://img.daisyui.com/images/stock/photo-1506748686214-e9df14d4d9d0.webp",
    },
  ];

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
    <article className="w-full h-full ">
      <div className="grid m-4 grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-4">
        {allBlogs.map((blog) => (
          <div
            key={blog.id}
            className="card bg-base-100 image-full w-full shadow-xl"
          >
            <figure>
              <img src={blog.bannerImage} alt={blog.title} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{blog.title}</h2>
              <p>{blog.description}</p>
              <div className="card-actions justify-end">
                <Link to={`/blog/${blog.slug}`} className="btn bg-red-500 rounded-md text-white">
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