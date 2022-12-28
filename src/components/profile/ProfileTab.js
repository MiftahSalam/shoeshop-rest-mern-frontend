import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { userUpdate } from '../../redux/actions/user';

import Message from '../errors/Error';
import Loading from '../errors/Loading';
import Toast from '../errors/Toast';

function ProfileTab() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.userDetail);
  const { loading, error, user } = userDetail;
  const userUpdateProfile = useSelector((state) => state.userUpdate);
  const { loading: updateLoading } = userUpdateProfile;
  const toastId = useRef(null);
  const toastObject = {
    pauseOnFocusLoss: false,
    dragable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error('Password does not match', toastObject);
      }
    } else {
      dispatch(userUpdate({ id: user._id, name, email, password }));
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.success('Profile updated', toastObject);
      }
    }
  };

  return (
    <>
      <Toast />
      {error && <Message variant={'alert-danger'}>{error}</Message>}
      {loading && <Loading />}
      {updateLoading && <Loading />}

      <form className="row form-container" onSubmit={submitHandler}>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-fn">UserName</label>
            <input
              className="form-control"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-email">E-mail Address</label>
            <input
              className="form-control"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-pass">New Password</label>
            <input
              className="form-control"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-confirm-pass">Confirm Password</label>
            <input
              className="form-control"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </>
  );
}

export default ProfileTab;
