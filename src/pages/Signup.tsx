import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Signup: React.FC = () => {
  const [rememberMe,setrememberMe] = useState<boolean>(true)
  const [email,setEmail]=useState<string>('')
  const [password,setPassword] = useState<string>('')
  

const {user,signUp}=useAuth();
const navigate=useNavigate();

const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  console.log(email)
      console.log('password', password.length)
  try {
      await signUp(email, password);

      
      navigate("/");
  } catch (err) {
      console.log("error in signing");
  }
  }
  return (
    <>
      <div className="w-full h-screen">
        <img className="hidden sm:block absolute w-full h-full object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/b2c3e95b-b7b5-4bb7-a883-f4bfc7472fb7/19fc1a4c-82db-4481-ad08-3a1dffbb8c39/IN-en-20240805-POP_SIGNUP_TWO_WEEKS-perspective_WEB_24a485f6-1820-42be-9b60-1b066f1eb869_large.jpg"
          alt="///"
        />
        <div className="bg-black/70 fixed top-0 left-0 w-full h-screen"/>
        <div className="fixed w-full px-4 py-24 z-20">
        <div className="max-w-[450px] h-[600px] mx-auto bg-black/80 rounded-lg">
        <div className="max-w-[320px] mx-auto py-16">
        <h1 className="text-3xl font-nsans-bold">Sign Up</h1>
            <form onSubmit={handleFormSubmit} className="w-full flex flex-col py-4">
               <input className="p-3 my-2 bg-gray-700 rounded"  type="text" placeholder="email" autoComplete="email" value={email} onChange={(e)=>setEmail(e.target.value)} />

              
               <input className="p-3 my-2 bg-gray-700 rounded"  type="password" placeholder="password" autoComplete="current-password" value={password} onChange={(e)=>setPassword(e.target.value)} />
               <button className="bg-red-600 py-3 my-6 rounded font-nsans-bold hover:bg-red-500">SignUp</button>
               <div className="flex justify-between items-center text-green-600">
                  <p>
                  <input checked={rememberMe} onChange={(e)=>setrememberMe(!rememberMe)} type="checkbox" className="mr-2" />Remember Me
                  </p>
                  <p>Need Help ?</p>
                </div>         
                <p className="my-4">
                  <span className="text-gray-600 mr-4">Already Subscribe to Netflix ?</span>
                  <Link to="/login">Sign In</Link>
                </p>
            </form>
        </div>
      </div>
     </div>
      </div>
    </>
  );
};

export default Signup;
