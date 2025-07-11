import React, { useEffect, useState } from 'react';
import { countries} from 'countries-list'
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingInfo } from '../../Redux/features/cartSlice';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from './CheckoutSteps';
const Shipping = () => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const countriesList = Object.values(countries);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shippingDetails = useSelector((state) => state.cart.shippingInfo);
  useEffect(() => {
    if (shippingDetails) {
      setAddress(shippingDetails.address || '');
      setCity(shippingDetails.city || '');
      setPhoneNo(shippingDetails.phoneNo || '');
      setPostalCode(shippingDetails.postalCode || '');
      setCountry(shippingDetails.country || '');
    }
  }, [shippingDetails]);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingInfo({
      address,
      city,
      phoneNo,
      postalCode,
      country,
    }));
    navigate('/confirm_order');
  };

  return (
    <>
    <CheckoutSteps shipping/>
    <div className="row wrapper mb-5">
      <div className="col-10 col-lg-5">
        <form
          className="shadow rounded bg-body"
          onSubmit={handleSubmit}
        >
          <h2 className="mb-4">Shipping Info</h2>

          <div className="mb-3">
            <label htmlFor="address_field" className="form-label">Address</label>
            <input
              type="text"
              id="address_field"
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="city_field" className="form-label">City</label>
            <input
              type="text"
              id="city_field"
              className="form-control"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="phone_field" className="form-label">Phone No</label>
            <input
              type="tel"
              id="phone_field"
              className="form-control"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="postal_code_field" className="form-label">Postal Code</label>
            <input
              type="number"
              id="postal_code_field"
              className="form-control"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="country_field" className="form-label">Country</label>
            <select
              id="country_field"
              className="form-select"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            >
              <option value="">-- Select Country --</option>
              {countriesList.map((country) => (
                <option key={country.code} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          <button id="shipping_btn" type="submit" className="btn w-100 py-2">
            CONTINUE
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Shipping;
