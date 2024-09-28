import { useState, useEffect } from "react";
import { FaSort, FaEye } from "react-icons/fa";
import { LuCamera, LuVideo, LuImage } from "react-icons/lu";
import { useForm } from "react-hook-form";
import { getStorage, ref, uploadBytes , getDownloadURL, deleteObject } from "firebase/storage";
import { getFirestore,addDoc,getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { app } from "../../../utils/firebase";
import { ToastContainer, toast } from "react-toastify";
import { generateSlug } from "../../../utils/helpers";

const db = getFirestore(app);
const storage = getStorage(app);

function BlogsTab() {
  const [blogs, setBlogs] = useState([]);
  const {register, reset, handleSubmit, formState:{errors}} = useForm();
  const [isLoading, setLoading] = useState(false)


  const deletePost = async(id) => {
    try {
      await deleteDoc(doc(db, "blogs", id));
      toast.info("Blog Deleted")
    }catch(err) {
      console.log(err)
      toast.error("Could not delete blog")
    }finally {

    }

  }
  

  const handleCreatePost = async (data) => {
    // console.log(data);
    setLoading(true)
    try {
      // Create a unique filename for the banner image
      const bannerFileName = `${new Date().toISOString()}_${
        data.coverImage[0].name
      }`;
      const storageRef = ref(storage, `blog/banners/${bannerFileName}`);

      let mediaPathOnCloud = "";

      // Upload the banner image to Firebase Storage
      await uploadBytes(storageRef, data.coverImage[0]);

      // Get the download URL of the uploaded banner image
      const bannerPathOnCloud = await getDownloadURL(storageRef);

      // Check if there is any media to upload
      if (data.media.length > 0) {
        const mediaFileName = `${new Date().toISOString()}_${data.media[0].name}`;
        const mediaStorageRef = ref(storage, `blog/media/${mediaFileName}`);

        // Upload the media file to Firebase Storage
        await uploadBytes(mediaStorageRef, data.media[0]);

        // Get the download URL of the uploaded media file
        mediaPathOnCloud = await getDownloadURL(mediaStorageRef);
      }

      // Prepare blog data object
      const blogData = {
        id: crypto.randomUUID(),
        author:'admin',
        title: data.title,
        slug: generateSlug(data.title),
        bannerImage: bannerPathOnCloud,
        data: `${data.post}`,
        status: "published",
        date: new Date().toLocaleString(),
        mediaUrl: mediaPathOnCloud || null, // Set to null if no media was uploaded
        mediaRef: data.media.length > 0 ? mediaPathOnCloud : null, // Reference only if media exists
      };

      // Add blog data to Firestore
      await addDoc(collection(db, "blogs"), blogData);

      // Reset form or state as needed
      reset();

      toast.success("Blog post added successfully!");
    } catch (error) {
      // Handle errors during upload
      console.error("Error uploading file:", error);
      alert("Error uploading file. Please try again.");
    } finally {
      // Optional: Reset the image preview or any other cleanup actions
      setLoading(false); // Ensure loading state is reset
    }
};

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
    <div className="w-full h-full p-4">
      <h1 className="text-xl text-center lg:font-light font-thin mb-6">
        Manage Posts
      </h1>
      <div>
        <button
          onClick={() => document.getElementById("my_modal_4").showModal()}
          className="btn hidden lg:block rounded-md bg-red-500 text-white font-light text-lg"
        >
          Add Post
        </button>
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <dialog id="my_modal_4" className="modal">
          <div className="modal-box w-11/12 h-4/5 flex flex-col max-w-5xl">
            <span>
              Blog should be written in{" "}
              <a target="_blank" className="link font-thin text-red-500" href="https://www.markdownguide.org/cheat-sheet/">markdown</a>{" "}
              format.{" "}
            </span>
            <h3 className="font-bold text-2xl mx-auto mb-4">New Post</h3>

            {/*Blog form */}
            <div className="">
              <form
                onSubmit={handleSubmit(handleCreatePost)}
                className="space-y-6"
              >
                <div>
                  <input
                    {...register("title")}
                    type="text"
                    placeholder="Title"
                    className="w-full text-4xl font-bold border-none outline-none placeholder-gray-300 focus:ring-0"
                    required
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <LuImage className="w-6 h-6 text-gray-500" />
                  </button>
                  <span className="text-sm text-gray-500">
                    <input
                      {...register("coverImage")}
                      type="file"
                      className="file-input file-input-ghost w-full max-w-xs"
                      placeholder="Add a cover image"
                    />
                  </span>
                </div>

                <div>
                  <textarea
                    {...register("post")}
                    placeholder="Tell your story..."
                    rows={10}
                    className="w-full font-light text-lg border-none outline-none resize-none placeholder-gray-300 focus:ring-0"
                    required
                  ></textarea>
                </div>

                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    className="p-2 rounded-full flex  hover:bg-gray-100 transition-colors"
                  >
                    <LuVideo className="w-6 h-6 text-gray-500" />
                  </button>
                  <input
                    {...register("media")}
                    type="file"
                    accept="video/*"
                    placeholder="Add a video URL (optional)"
                    className="file-input file-input-bordered  w-full max-w-xs"
                  />
                </div>
                <div className="w-full">
                  <button
                    type="submit"
                    className="btn rounded-md bg-black text-white font-medium w-36 text-lg-"
                  >
                    {isLoading ? (
                      <span className="loading loading-spinner text-error"></span>
                    ) : (
                      "Publish"
                    )}
                  </button>
                </div>
              </form>
            </div>

            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
          <ToastContainer />
        </dialog>
      </div>
      <div className="grid gap-36 grid-cols-2 lg:grid-cols-4  ">
        {blogs.map((blog) => (
          <div className="card  rounded-sm bg-base-100  w-60 lg:w-80 shadow-xl">
            <figure className="px-3 pt-4">
              <img
                src={blog.bannerImage}
                alt={blog.title}
                className="rounded-xl"
              />
            </figure>
            <div className="card-body items-center text-center">
              <p>{blog.title}</p>
              <div className="card-actions">
                {/* <button className="btn bg-red-500 rounded-md text-white font-light text-lg">
                  Update
                </button> */}
                <button onClick={()=>deletePost(blog._id)} className="btn btn-ghost rounded-md text-black font-thin text-lg">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogsTab;
