import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import { register } from '../redux/actions/user';
import Message from '../components/errors/Error';
import Loading from '../components/errors/Loading';

const RegisterScreen = () => {
  window.scrollTo(0, 0);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const redirect = location.search ? location.search.split('=')[1] : '/';
  const registerUser = useSelector((state) => state.register);
  const { loading, error, userInfo } = registerUser;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  };

  return (
    <>
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {error && <Message variant={'alert-danger'}>{error}</Message>}
        {loading && <Loading />}

        <form
          className="Login col-md-8 col-1g-4 col-11"
          onSubmit={submitHandler}
        >
          <input
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Register</button>
          <p>
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
              I Have Account <strong>Login</strong>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default RegisterScreen;
