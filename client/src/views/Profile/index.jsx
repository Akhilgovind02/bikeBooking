import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Card, Button, Avatar } from 'antd';
import ImageUploader from 'react-images-upload';
import { uploadFile } from 'react-s3';
import { editProfile } from '../../reducers/authReducer';

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth?.user);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [mobile, setMobile] = useState(user.mobile);
  const [userName, setUserName] = useState(user.username);
  const [photo, setPhoto] = useState(user.photo);
  const [bikeDetails, setBikeDetails] = useState(user.bikeDetails);
  const [availability, setAvailability] = useState(user.availability);
  const [rates, setRates] = useState(user.rates);
  const [active, setActive] = useState(true);

  const onNameChange = (txt) => {
    setName(txt.target.value);
  };
  const onEmailChange = (txt) => {
    setEmail(txt.target.value);
  };
  const onUserNameChange = (txt) => {
    setUserName(txt.target.value);
  };
  const onMobileChange = (txt) => {
    setMobile(txt.target.value);
  };

  const onsave = () => {
    dispatch(
      editProfile({
        name: name,
        email: email,
        username: userName,
        mobile: mobile,
        photo: photo,
        bikeDetails: bikeDetails,
        availability: availability,
        rates: rates,
      })
    );
  };

  const S3_BUCKET = '';
  const REGION = '';
  const ACCESS_KEY = '';
  const SECRET_ACCESS_KEY = '';

  const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    dirName: 'users_profile_photo/' + user._id,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
  };

  const onFileChange = (event) => {
    setPhoto(event[0]);
    setActive(false);
  };

  const handleUpload = async () => {
    await uploadFile(photo, config)
      .then((data) => {
        console.log(data);
        console.log('uploaded');
        setActive(true);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <div className="avatar">
            <Avatar size="large" src={user.photo} />
          </div>
          <h5 className="card-title">{user.name}</h5>
          <h5 className="card-text">{'@' + user.username}</h5>
          <p className="card-text">
            {user.email}
            <br />
            <span className="phone">{user.mobile}</span>
          </p>
        </div>
        <span>user's Bio</span>
      </div>
      <Card className="Form">
        <Form size="middle" colon={true} labelAlign="left" layout="vertical">
          <Form.Item label="Name:">
            <Input allowClear={true} className="input" value={name} onChange={onNameChange} />
          </Form.Item>
          <Form.Item label="User Name:">
            <Input allowClear={true} className="input" value={userName} onChange={onUserNameChange} />
          </Form.Item>
          <Form.Item label="Email:">
            <Input allowClear={true} className="input" value={email} onChange={onEmailChange} />
          </Form.Item>
          <Form.Item label="Mobile:">
            <Input allowClear={true} className="input" value={mobile} onChange={onMobileChange} />
          </Form.Item>
          <Form.Item label="Bike Details:">
            <Input allowClear={true} className="input" value={bikeDetails} onChange={(e) => setBikeDetails(e.target.value)} />
          </Form.Item>
          <Form.Item label="Availability:">
            <Input allowClear={true} className="input" value={availability} onChange={(e) => setAvailability(e.target.value)} />
          </Form.Item>
          <Form.Item label="Rates:">
            <Input allowClear={true} className="input" value={rates} onChange={(e) => setRates(e.target.value)} />
          </Form.Item>
          <Form.Item label="Photo:">
            <ImageUploader
              withIcon={true}
              buttonText="Choose images"
              onChange={onFileChange}
              imgExtension={['.jpg', '.png']}
              maxFileSize={1048576}
              singleImage={true}
              label="max size 1MB"
            />
            <button onClick={handleUpload}>Upload!</button>
          </Form.Item>
          <Button disabled={!active} onClick={onsave} loading={!active}>
            Save Changes
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Profile;
