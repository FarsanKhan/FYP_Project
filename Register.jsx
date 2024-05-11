
import React, { useContext, useState } from "react";
import { FaRegUser } from "react-icons/fa"; //renders the "Regular User" icon from the Font Awesome 5 library
import { MdOutlineMailOutline } from "react-icons/md"; //renders the Material Design Outline Mail icon 
import { RiLock2Fill } from "react-icons/ri"; //renders the "Lock (Filled)" icon from the Remix Icon set.
import { FaPencilAlt } from "react-icons/fa";
import { Link, NavLink, Navigate } from "react-router-dom";
import axios from "axios"; //Axios library, which is a popular promise-based HTTP(GET, POST, PUT, DELETE) client for making API requests in web applications.
import toast from "react-hot-toast";
import { Context } from "../../main";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        { name, email, role, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setName("");
      setEmail("");
      setPassword("");
      // setPhone("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  if(isAuthorized){
    return <Navigate to={'/'}/>
  }

  return (
    <>
      <section className="authPage">
        <div className="container">
          <div className="header">
        <img className="logopic" src="./logo.PNG" alt="logo" />
               <h3>Create a new account</h3>
          </div>
          <form>
            <div className="inputTag">
              <label>Register As</label>
              <div>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Account Type</option>
                  <option value="Employer">Employer</option>
                  <option value="Job Seeker">Job Seeker</option>
                </select>
                <FaRegUser />
              </div>
            </div>
            <div className="inputTag">
              <label>Name</label>
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <FaPencilAlt />
              </div>
            </div>
            <div className="inputTag">
              <label>Email Address</label>
              <div>
                <input
                  type="email"
                  placeholder="zk@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MdOutlineMailOutline />
              </div>
            </div>
            {/* <div className="inputTag">
              <label>Phone Number</label>
              <div>
                <input
                  type="number"
                  placeholder="12345678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <FaPhoneFlip />
              </div>
            </div> */}
            <div className="inputTag">
              <label>Password</label>
              <div>
                <input
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <RiLock2Fill />
              </div>
            </div>
            <button type="submit" onClick={handleRegister}>
              Register
            </button>
            <Link to={"/login"}>Login Now</Link>
          </form>
        </div>
        {/* <div className="banner">
          <img src="/register.png" alt="login" />
        </div> */}
      </section>
    </>
  );
};

export default Register;
