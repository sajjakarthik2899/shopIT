import React, { useEffect, useState } from 'react';
import { useLoginMutation } from '../../Redux/api/authApi';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  // ✅ State for form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, {error, isError, isLoading}] = useLoginMutation();
  const {isAuthenticated} =  useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page refresh

    const loginData = {
      email,
      password,
    }
    login(loginData);
  };
  useEffect(() => {
    if(isAuthenticated) {
      navigate('/');
    }
    if (error) {
      toast.error(error?.data?.message || "Something went wrong while logging in");
    }
  }, [error, isAuthenticated]);
  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="col-12 col-sm-10 col-md-8 col-lg-5">
        <form className="shadow p-4 rounded bg-white" onSubmit={handleSubmit}>
          <h2 className="mb-4 text-center">Login</h2>

          {/* Email Field */}
          <div className="mb-3">
            <label htmlFor="email_field" className="form-label">Email</label>
            <input
              type="email"
              id="email_field"
              className="form-control bg-light"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-3">
            <label htmlFor="password_field" className="form-label">Password</label>
            <input
              type="password"
              id="password_field"
              className="form-control bg-light"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Forgot Password */}
          <div className="text-end mb-4">
            <a href="/password/forgot" className="text-decoration-none">Forgot Password?</a>
          </div>

          {/* Login Button */}
          <button
            id="login_button"
            type="submit"
            className="btn w-100 py-2"
            style={{ backgroundColor: "#f59e0b", color: "#fff" }}
            disabled={isLoading}
          >
            {isLoading ? 'Authenticating...' : 'LOGIN'}
          </button>

          {/* New User Link */}
          <div className="text-end mt-3">
            <a href="/register" className="text-decoration-none">New User?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
