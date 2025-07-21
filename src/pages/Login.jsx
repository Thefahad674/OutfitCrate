import React, { useContext, useState } from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import googleImg from "../assets/google.jpg";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/Firebase";
import { userDataContext } from "../context/UserContext";

function Login() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  let {serverUrl} = useContext(authDataContext)
  let {getCurrentUser} = useContext(userDataContext)

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    
    let result = await axios.post(`${serverUrl}/api/auth/login`, {
      email, 
      password
    }, {
      withCredentials: true
    });
    console.log(result.data);
    getCurrentUser()
    navigate("/")
    
   } catch (error) {
    console.log(error.response?.data || error.message); 
   }
}

const googleLogin = async () => {
    try {
        const response = await signInWithPopup(auth, provider)
        let user = response.user
        let name = user.displayName
        let email = user.email

        const result = await axios.post( `${serverUrl}/api/auth/googlelogin`, {
            name, email
        }, {withCredentials:true})
        console.log(result.data);
    } catch (error) {
        console.log(error);
    }
}

  return (
    <div className="w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center justify-start">
      <div
        className="w-full h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img className="w-[50px] h-[50px] rounded-2xl" src={logo} alt="logo" />
        <h1 className="text-[22px] font-sans">OutfitCrate</h1>
      </div>

      <div className="w-full h-[100px] flex items-center justify-center flex-col gap-[10px]">
        <span className="text-[25px] font-semibold">Login</span>
        <span className="text-[16px]">
          Welcome to OutfitCrate, Login to your account
        </span>
      </div>

      {/* Form Container */}
      <div className="max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border border-[#96969635] backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify-center">
        <form className="w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]"
        onSubmit={handleLogin}>
          {/* Google Auth */}
          <div className="w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer" onClick={googleLogin}>
            <img src={googleImg} className="w-[20px] rounded-2xl" alt="" />
            Login with Google
          </div>

          {/* Divider */}
          <div className="w-[100%] h-[20px] flex items-center justify-center gap-[10px]">
            <div className="w-[40%] h-[1px] bg-[#96969635]"></div> Or{" "}
            <div className="w-[40%] h-[1px] bg-[#96969635]"></div>
          </div>

          {/* Inputs */}
          <div className="w-[90%] flex flex-col items-center justify-center gap-[15px]">
            {/* Email */}
            <input
              type="email"
              className="w-full h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold"
              placeholder="Email"
              required
              onChange={(e)=> setEmail(e.target.value)}
              value={email}
            />

            {/* Password + Eye Icon */}
            <div className="w-full relative">
              <input
                type={show ? "text" : "password"}
                className="w-full h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] pr-[40px] font-semibold"
                placeholder="Password"
                required
                onChange={(e)=>setPassword(e.target.value)}
                value={password}
              />
              <AnimatePresence mode="wait">
                {!show ? (
                  <motion.div
                    key="show"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.3 }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                    onClick={() => setShow(true)}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <IoEyeOutline className="w-[20px] h-[20px]" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="hide"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.3 }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                    onClick={() => setShow(false)}
                    whileHover={{ scale: 1.2, rotate: -10 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <IoEyeOffOutline className="w-[20px] h-[20px]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Submit Button */}
            <button className="w-full h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold">
              Login
            </button>

            {/* Already have account */}
            <p className="flex gap-[10px]">
              Already have an account?
              <span
                className="text-[#5555f6cf] text-[17px] font-semibold cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
