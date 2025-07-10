import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useRegisterMutation } from '../../Redux/api/authApi';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Register = () => {
    // ✅ Form state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [register, {error, isError, isLoading}] = useRegisterMutation();
    const {isAuthenticated} =  useSelector((state) => state.auth);
    const navigate = useNavigate();
  // ✅ Submit handler
  useEffect(() => {
    if(isAuthenticated){
        navigate('/');
    }
      if (error) {
        toast.error(error?.data?.message || "Something went wrong while registering");
      }
    }, [error]);
  const handleSubmit = (e) => {
    e.preventDefault(); 

    const userData = {
      name,
      email,
      password
    };

    register(userData);
  };

  return (
    <div className="row wrapper justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="col-10 col-lg-5">
        <form
          className="shadow rounded bg-body p-4"
          onSubmit={handleSubmit}
        >
          <h2 className="mb-4 text-center">Register</h2>

          {/* Name */}
          <div className="mb-3">
            <label htmlFor="name_field" className="form-label">Name</label>
            <input
              type="text"
              id="name_field"
              className="form-control"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email_field" className="form-label">Email</label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password_field" className="form-label">Password</label>
            <input
              type="password"
              id="password_field"
              className="form-control"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            id="register_button"
            type="submit"
            className="btn btn-success w-100 py-2"
            disabled={isLoading}
          >
            {isLoading ? "REGISTERING..." : "REGISTER"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
