import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import Message from '../components/errors/Error';
import { login } from '../redux/actions/user';
import Loading from '../components/errors/Loading';

const LoginScreen = () => {
  window.scrollTo(0, 0);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const redirect = location.search ? location.search.split('=')[1] : '';
  const loggedUser = useSelector((state) => state.login);
  const { loading, error, userInfo } = loggedUser;

  console.log('LoginScreen-redirect: ', redirect);
  useEffect(() => {
    if (userInfo) {
      navigate(`/${redirect}`);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
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
          <button type="submit">Login</button>

          <p>
            <Link
              to={redirect ? `/register?redirect=${redirect}` : '/register'}
            >
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default LoginScreen;
