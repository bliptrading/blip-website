import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { app } from "../../utils/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";

import { toast, ToastContainer } from "react-toastify";
import Store from "../../store/Store";
import { getDoc,getFirestore, doc, collection } from "firebase/firestore";

const db = getFirestore(app)

function Login() {
  const {register, handleSubmit} = useForm()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const auth = getAuth(app);
  const { setLoggedIn} = Store()
  const [isLoading, setLoading] = useState(false);


const handleLogin = async(data) => {
  setLoading(true)
  const {email, password } = data;
  try {
    const docRef = doc(db, "users", email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists() && (docSnap.data().password ===password)) {
       localStorage.setItem("user", JSON.stringify(docSnap.data()));
       navigate('/')
    }else {
      throw new Error("Invalid Credentials")
    }
  }catch (err) {
    toast.error(err)

  }finally {
    setLoading(false)
  }

  };
  return (
    <div>
      <div className="flex flex-col items-center justify-center ">
        <div className="w-4/6 md:w-3/6 lg:w-2/6">
          <h1 className="flex sm:text-base items-center justify-center m-8 lg:text-4xl font-semibold ">
            WELCOME BACK
          </h1>

          <form
            onSubmit={handleSubmit(handleLogin)}
            
          >
            <h5>E-mail</h5>
            <input
              {...register("email")}
              type="text"
              className="w-full p-2 border border-gray-500 bg-gray-50"
            />

            <h5>Password</h5>
            <input
              {...register("password")}
              type="password"
              className="w-full p-2 border border-gray-500 bg-gray-50"
            />

            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="w-2/4 px-6 py-3 my-6 font-light text-lg text-white bg-red-500 rounded-sm shadow "
                
              >
                {isLoading ? (
                  <span className="loading loading-spinner mx-auto loading-lg"></span>
                ) : (
                  <h1>SIGN IN</h1>
                )}
              </button>
            </div>
          </form>
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm">
              By signing-in you agree to the You Shop Website Conditions of Use
              & Sale.
            </p>

            <p className="m-6 text-sm">
              <span>Don't have an account? </span>
              <Link to="/accounts/signup" className="hover:text-red-500">
                Create an account here
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="mx-4 lg:mx-8 xl:mx-10 my-[7rem]">{/* <Banner /> */}</div>
      <ToastContainer />
    </div>
  );
}

export default Login;
