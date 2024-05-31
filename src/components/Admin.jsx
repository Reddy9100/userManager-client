import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {Toaster,toast} from "react-hot-toast"
import Aos from "aos";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    gender: "",
    address: "",
    pincode: "",
    file: null // Include file property for image upload
  });

  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    gender: "",
    address: "",
    pincode: "",
    file: null // Include file property for image upload
  });

  const navigate = useNavigate();
  const adminToken = Cookies.get("adminToken");

  useEffect(() => {
    if (!adminToken) {
      navigate("/");
    } else {
      fetchUsers();
    }
  Aos.init({duration:3000})
  }, [adminToken, navigate]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://usermanager-5yph.onrender.com/users", {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
      navigate("/");
    }
  };

  const createUser = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in newUser) {
      formData.append(key, newUser[key]);
    }
    try {
      const response = await axios.post(
        "https://usermanager-5yph.onrender.com/create-user",
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      console.log(response);
      if (response.status === 201) {
        toast.success(response.data.message);
        setUsers([...users, response.data.user]);
        setShowModal(false);
        setNewUser({
          name: "",
          email: "",
          phoneNumber: "",
          gender: "",
          address: "",
          pincode: "",
          file: null
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        toast.error("upload Images Only");
      } else {
        toast.error(error.response.data.message);
      }
    }
    }
  ;

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
    if (name === 'file') {
      setNewUser({ ...newUser, [name]: files[0] });
    } else {
      setNewUser({ ...newUser, [name]: value });
    }
  };

  const handleUpdateInputChange = (event) => {
    const { name, value, files } = event.target;
    if (name === 'file') {
      setUpdatedUser({ ...updatedUser, [name]: files[0] });
    } else {
      setUpdatedUser({ ...updatedUser, [name]: value });
    }
  };

  const updateUserFunction = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in updatedUser) {
      formData.append(key, updatedUser[key]);
    }
    try {
      const response = await axios.put(
        `https://usermanager-5yph.onrender.com/users/${updatedUser.email}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      console.log(response.data);
      toast.success(response.data.message)
      console.log(`User with email ${updatedUser.email} updated successfully.`);
      setShowModalUpdate(false);
    } catch (error) {

      if (error.response && error.response.status === 500) {
        toast.error("upload Images Only");
      } else {
        toast.error(error.response.data.message);
      }
    }

    fetchUsers();
  };

  const handleLogout = () => {
    Cookies.remove("adminToken");
    navigate("/");
  };

  const userIdentify = (userId, userName, userEmail) => {
    console.log("User ID:", userId);
    console.log(userName);
    console.log(userEmail);
  };

  const deleteUser = async (email) => {
    try {
      const response = await axios.delete(
        `https://usermanager-5yph.onrender.com/users/${email}`,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      console.log(response.data);
      toast.success(response.data.message)
      console.log(`User with email ${email} deleted successfully.`);
    } catch (error) {
      toast.error(error.response.data.message)
      console.error(`Error deleting user with email ${email}:`, error);
    }

    fetchUsers();
  };

  const updateUser = (user) => {
    setUpdatedUser(user);
    setShowModalUpdate(true);
  };
  console.log(users)
  const countofUsers = users.length

  return (
    <>
      <nav className="bg-white p-4 flex justify-around items-center text-black font-medium" style={{fontFamily : "Orbiton ,sans serif"}}>
        <div>
          <span className="text-orange-500 font-mono font-bold">Welcome, Admin!</span>
        </div>
        <Toaster/>
        <div style={{fontFamily : "Orbiton ,sans serif"}} >
          <button onClick={handleLogout} className="text-white bg-black p-2 rounded-md  hover:bg-white hover:text-black hover:border border-r-red-600 border-l-lime-400 border-t-black border-b-blue-600 ">Logout</button>
        </div>
      </nav>
      <div className="container-fluid overflow-x-hidden min-h-screen p-10  mx-auto bg-black  px-4">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-orange-500 animate-bounce text-white py-2 px-4 rounded hover:bg-green-500 mb-4"
        >
          <i className="fa-solid fa-pen-to-square"></i>
          Create User 
        </button>

        <button className="float-end bg-white py-2 px-4 rounded"><i className="fa-solid fa-users-between-lines font-extrabold animate text-black"></i>
        Head Count {countofUsers}</button>
        
        
        {/* <i className="fa fa-trash-alt text-red-600 bg-white h-20 animate-pulse float-right"></i> */}
        <div>
          <h2 className="text-xl font-bold mb-2">Users</h2>
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-20 md:gap-14 md:m-12 w-auto">
            {users.map((user) => (
              <div
                key={user._id}
                onClick={() => userIdentify(user._id, user.name, user.email)}
                className="bg-white font-medium  p-4 rounded-lg shadow-md flex flex-col justify-between"  data-aos="fade-left"
                data-aos-anchor="#example-anchor"
                data-aos-offset="500"
                data-aos-duration="500"
              >
                <div>
                <img src={`https://usermanager-5yph.onrender.com/uploads/${user.file}`} className="rounded-tr-[10%] rounded-bl-[10%] h-[100px] mx-auto relative -translate-y-14"  alt="User" />
                  <p className="font-semibold text-lg">{user.name}</p>
                  <p className="text-gray-500">{user.email}</p>
                  <p className="text-gray-500">{user.phoneNumber}</p>
                  <p className="text-gray-500">{user.gender}</p>
                  <p className="text-gray-500">{user.address}</p>
                  <p className="text-gray-500">{user.pincode}</p>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    className="text-black mr-5 bg-green-400 font-bold rounded-md p-2 "
                    onClick={() => updateUser(user)}
                  >
                    Update
                  </button>
                  <button
                    className="text-red-500 font-bold bg-black p-2 rounded-md"
                    onClick={() => deleteUser(user.email)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

{showModal && (
  <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-60">
    <div className="bg-black m-11 h-[500px] overflow-auto lg:h-auto text-white font-semibold p-8 rounded-lg w-full max-w-md">
      <h2 className="text-2xl mb-4">Create User</h2>
      <form onSubmit={createUser} encType="multipart/form-data">
        <div className="mb-4">
          <label htmlFor="file" className="block mb-2">
            Photo:
          </label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">
            Name:
          </label>
          <input 
            type="text"
            id="name"
            name="name"
            value={newUser.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded text-orange-600"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded text-orange-600"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block mb-2">
            Phone Number:
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={newUser.phoneNumber}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded text-orange-600"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="gender" className="block mb-2">
            Gender:
          </label>
          <select
            id="gender"
            name="gender"
            value={newUser.gender}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded text-orange-600"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block mb-2">
            Address:
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={newUser.address}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded text-orange-600"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="pincode" className="block mb-2">
            Pincode:
          </label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            value={newUser.pincode}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded text-orange-600"
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 mr-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  </div>
)}

{showModalUpdate && (
  <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-90">
    <div className="bg-black h-[500px] overflow-auto lg:h-auto text-white p-8 rounded-lg w-full m-11 max-w-md">
      <h2 className="text-2xl mb-4">Update User</h2>
      <form onSubmit={updateUserFunction} encType="multipart/form-data" className="">
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={updatedUser.name}
            onChange={handleUpdateInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded text-orange-600"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={updatedUser.email}
            onChange={handleUpdateInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded text-orange-600"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block mb-2">
            Phone Number:
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={updatedUser.phoneNumber}
            onChange={handleUpdateInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded text-orange-600"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="gender" className="block mb-2">
            Gender:
          </label>
          <select
            id="gender"
            name="gender"
            value={updatedUser.gender}
            onChange={handleUpdateInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded text-orange-600"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block mb-2">
            Address:
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={updatedUser.address}
            onChange={handleUpdateInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded text-orange-600"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="pincode" className="block mb-2">
            Pincode:
          </label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            value={updatedUser.pincode}
            onChange={handleUpdateInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded text-orange-600"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="file" className="block mb-2">
                  Photo:
                </label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  onChange={handleUpdateInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded text-orange-600"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowModalUpdate(false)}
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboard;

