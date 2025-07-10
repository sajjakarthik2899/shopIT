import React, { useEffect, useState } from 'react';
import { useForgotPasswordMutation } from '../../Redux/api/usersApi';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
// import { useForgotPasswordMutation } from '../../Redux/api/usersApi'; // Optional if using RTK Query

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
 const [forgotPassword, { isLoading, error, isSuccess }] = useForgotPasswordMutation();
  const {isAuthenticated} =  useSelector((state) => state.auth);  
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    forgotPassword({email});
  };
  useEffect(() => {
    if(isAuthenticated) {
      navigate('/');
    }
    if (error) {
      toast.error(error?.data?.message || "Something went wrong while logging in");
    }
    if(isSuccess) {
      toast.success("Email sent successfully. Please check your inbox.");
    }
  }, [error, isAuthenticated, isSuccess]);
  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form
          className="shadow rounded bg-body"
          onSubmit={handleSubmit}
        >
          <h2 className="mb-4">Forgot Password</h2>

          <div className="mt-3">
            <label htmlFor="email_field" className="form-label">Enter Email</label>
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

          <button
            id="forgot_password_button"
            type="submit"
            className="btn w-100 py-2 mt-4"
          >
            {isLoading ? 'Sending...' : 'Send Email'}
          </button>

          {message && (
            <div className="alert alert-info mt-3" role="alert">
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
