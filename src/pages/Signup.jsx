import React, { useState } from 'react';
import { Link } from 'react-router';
import axios from 'axios';

export const Signup = () => {
    const [userType, setUserType] = useState('user');
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
        gender: '',
        dob: '',
        speciality: '',
        DP: null
    });

    const specialities = ['Pediatrician', 'Gynaecologist', 'Dermatologist', 'General Physician', 'Neurologist', 'Gastroenterologist'];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({ ...prev, DP: file }));
        }
    };
    const submitFn = async (e) => {
    e.preventDefault();
    const email = formData.email
    const password = formData.password
    const role = userType

    const data = {
      email,
      password,
      role
    }
    console.log(data);
    

    await axios.post("http://quickcare-backend.vercel.app/api/v1/Authentication/login", data, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
      .then(response => {
        console.log("✅ Response:", response)
        console.log("✅ Response.data:", response.data.message)


      })
      .catch(error => {
        console.error("❌ Error:", error);
        if (error.response) {
          console.log("📌 Server responded with:", error.response.data);
        } else if (error.request) {
          console.log("📌 No response received:", error.request);
        } else {
          console.log("📌 Axios error:", error.message);
        }
      });

    // console.log(formData);

  }

    return (
        <form className="min-h-[80vh] flex items-center" onSubmit={submitFn}>
            <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-[500px] text-zinc-600 rounded-xl shadow-lg">

                {/* Tab Switch */}
                <div className="flex w-full ">
                    <button
                        className={`flex-1 py-2 ${userType === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-200'} rounded-l-lg`}
                        onClick={() => setUserType('user')}
                        type="button"
                    >User</button>
                    <button
                        className={`flex-1 py-2 ${userType === 'Doctor' ? 'bg-indigo-600 text-white' : 'bg-gray-200'} rounded-r-lg`}
                        onClick={() => setUserType('Doctor')}
                        type="button"
                    >Doctor</button>
                </div>

                <p className='text-2xl font-semibold mt-2 mx-auto'>Create {userType === 'user' ? 'User' : 'Doctor'} Account</p>

                {userType === 'Doctor' && (
                    <div className='w-full flex flex-col items-center my-3'>
                        <label htmlFor="profilePic">
                            <img
                                src={formData.DP ? URL.createObjectURL(formData.DP) : "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"}
                                alt="Profile"
                                className="w-24 h-24 rounded-full border border-gray-300 object-cover cursor-pointer"
                            />
                        </label>
                        <input
                            type="file"
                            id="profilePic"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                        <p className="text-sm text-gray-500 mt-3">Click to upload profile picture</p>
                    </div>
                )}

                {/* Common Fields */}

                <div className='w-full'>
                    <p>Full Name</p>
                    <input className='border border-zinc-300 rounded w-full p-2 mt-2' type="text" name="fullname" onChange={handleChange} value={formData.fullname} required />
                </div>
                <div className='w-full'>
                    <p>Email</p>
                    <input className='border border-zinc-300 rounded w-full p-2 mt-2' type="email" name="email" onChange={handleChange} value={formData.email} required />
                </div>
                <div className='w-full'>
                    <p>Password</p>
                    <input className='border border-zinc-300 rounded w-full p-2 mt-2' type="password" name="password" onChange={handleChange} value={formData.password} required />
                </div>
                <div className='w-full flex'>
                    <p className='gap-4 mt-2'>Gender</p>
                    <div className="flex gap-4 mt-2 ml-3">
                        <label><input type="radio" name="gender" value="Male" onChange={handleChange} /> Male</label>
                        <label><input type="radio" name="gender" value="Female" onChange={handleChange} /> Female</label>
                    </div>
                </div>
                <div className='w-full'>
                    <p>Date of Birth</p>
                    <input className='border border-zinc-300 rounded w-full p-2 mt-2' type="date" name="dob" onChange={handleChange} value={formData.dob} required />
                </div>

                {/* Doctor-Specific Fields */}
                {userType === 'Doctor' && (
                    <div>

                        <div className='w-full'>
                            <p>Speciality</p>
                            <select className='border border-zinc-300 rounded w-full p-2 mt-2' name="speciality" onChange={handleChange} value={formData.speciality} required>
                                <option value="">Select Speciality</option>
                                {specialities.map((spec) => (
                                    <option key={spec} value={spec}>{spec}</option>
                                ))}
                            </select>
                        </div>

                        <div className='w-full mt-4'>
                            <p>Experience (Years): {formData.experienceOf || 1}</p>
                            <input
                                type="range"
                                min="1"
                                max="100"
                                name="experienceOf"
                                value={formData.experienceOf || 1}
                                onChange={handleChange}
                                className='w-full mt-2'
                            />
                        </div>

                    </div>

                )}

                <button className='bg-indigo-600 text-white w-full py-2 rounded-md text-base cursor-pointer mt-2' >Create Account</button>
                <p>Already have an account? <Link to={'/login'} className='text-indigo-600 underline cursor-pointer'>Login here</Link> </p>
            </div>
        </form>
    );
};
