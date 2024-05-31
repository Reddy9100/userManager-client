import { useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const openModal = () => {
    setShowNav(false); // Close the nav when opening the modal
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminCredentials({ ...adminCredentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://usermanager-5yph.onrender.com/login', adminCredentials);
      if (response.status === 200) {
        toast.success('Admin login successful!');
        closeModal();
        Cookies.set('adminToken', response.data.token);
        setTimeout(() => { navigate("/admin") }, 2000);
      }
    } catch (error) {
      toast.error('Admin login failed. Please try again.');
      closeModal();
    }
  };

  const toggleNav = () => setShowNav(!showNav);

  return (
    <div className="sticky">
      <Toaster />
      <nav className="flex  justify-between md:justify-around  items-center bg-white h-[30px] p-7 relative">
        <h1 className="text-orange-500 font-semibold animate-pulse">UserManager</h1>
        <button className="block md:hidden" onClick={toggleNav}>
          <svg className="w-6  h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
        <ul className={`fixed top-0 right-0 bg-slate-500 md:bg-white  md:text-black text-white font-medium h-[35%] border-r-tl-10% w-2/3 p-5 shadow-lg transition-transform duration-300 transform ${showNav ? 'translate-x-0' : 'translate-x-full'} md:relative md:flex md:items-center md:w-auto md:h-auto md:shadow-none md:p-0 md:translate-x-0`}>
          <button className="absolute top-4 right-4 md:hidden" onClick={toggleNav}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <li className="md:ml-4 md:mt-0 mt-5 flex items-center">
            <Link to="/" onClick={toggleNav} className="flex items-center">
              <svg className="w-6 h-6 mr-2 md:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7m-9-5v12a4 4 0 004 4h4a4 4 0 004-4V5"></path>
              </svg>
              Home
            </Link>
          </li>
          <li className="md:ml-4 md:mt-0 mt-5 flex items-center" onClick={openModal}>
            <div className="flex items-center cursor-pointer">
              <svg className="w-6 h-6 mr-2 md:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
              </svg>
              Admin
            </div>
          </li>
          <li className="md:ml-4 md:mt-0 mt-5 flex items-center">
            <Link to="/contact" onClick={toggleNav} className="flex items-center">
              <svg className="w-6 h-6 mr-2 md:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 8h18"></path>
              </svg>
              Contact
            </Link>
          </li>
        </ul>
      </nav>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-60">
          <div className="bg-black text-orange-700 font-semibold md:w-[500px] p-8 rounded-lg relative">
            <h2 className="text-2xl mb-4">Admin Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2">Email:</label>
                <input type="email" id="email" name="email" value={adminCredentials.email} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded" required />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block mb-2">Password:</label>
                <input type="password" id="password" name="password" value={adminCredentials.password} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded" required />
              </div>
              <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Submit</button>
            </form>
            <button className="absolute top-4 right-4 text-orange-600" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
