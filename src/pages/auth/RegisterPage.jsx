import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { app } from "../../utils/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";

const auth = getAuth(app);
const db = getFirestore(app);

function Register() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleRegister = async (data) => {
    setLoading(true);
    const { email, password, phone } = data;

    try {
    
      const userData = {
        username: "",
        phone: phone,
        email: email,
        location: "",
        address: "",
        password:password
      };

      // Set user document in Firestore
      await setDoc(doc(db, "users", email), userData);

      // If user creation and document setting are successful
        toast.success("User created!");
        reset()
      
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      toast(`${errorCode}: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center ">
        <div className="w-4/6 md:w-3/6 space-y-4 lg:w-2/6">
          <h1 className="flex sm:text-3xl md:text-4xl items-center justify-center m-8 lg:text-4xl font-semibold ">
            CREATE AN ACCOUNT
          </h1>

          <form className="space-y-2" onSubmit={handleSubmit(handleRegister)}>
            <h5>E-mail</h5>
            <input
            placeholder="kojo@gmail.com"
              type="text"
              className={`w-full p-2 border ${
                errors.email ? "border-red-500" : "border-gray-500"
              } bg-gray-50`}
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}

            <h4>Phone Number</h4>
            <input
              placeholder="02444123443"
              type="text"
              pattern="^0\d{9}$"
              className={`w-full p-2 border ${
                errors.phone ? "border-red-500" : "border-gray-500"
              } bg-gray-50`}
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^0\d{9}$/,
                  message:
                    "Phone number must start with 0 and be exactly 10 digits",
                },
              })}
            />

            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}

            <h5>Password</h5>
            <input
              type="password"
              className={`w-full p-2 border ${
                errors.password ? "border-red-500" : "border-gray-500"
              } bg-gray-50`}
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}

            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="w-2/4 px-6 py-3 my-6 text-lg text-white bg-red-500 rounded-sm shadow "
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="loading loading-spinner mx-auto loading-lg"></span>
                ) : (
                  <h1>REGISTER</h1>
                )}
              </button>
            </div>
          </form>

          <div className="flex flex-col items-center justify-center">
           
            <p className="m-6 text-sm">
              <span>Have an account? </span>
              <Link to="/accounts/login" className="hover:text-red-600 ">
                login here
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

export default Register;
