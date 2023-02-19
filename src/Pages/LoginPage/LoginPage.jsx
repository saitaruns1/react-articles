import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import InputBox from '../../components/InputBox/InputBox';
import './style.css'
import { login_user } from '../../Authservice';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { getUserId } from '../../Authheader';

const initialValues = {
    email: '',
    password: '',
    checked: false,
}

const validate = values => {
    const errors = {};

    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if(!values.password){
        errors.password = 'Required'
    }
  
    return errors;
  };

const LoginPage = () => {

  const navigate = useNavigate()

  useEffect(()=>{
    console.log(getUserId())
    if(getUserId()){
      navigate('/')
      // window.location.reload();
    }
  },[])

  const onSubmit = (values) => {
    login_user(values.email, values.password).then(
        (response) => {
          navigate("/");
          window.location.reload();
        },
        error => {
          console.log(error)
        }
      );
}

    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    });

    return (<div className='auth-page'>
        <h1>Log in to your account</h1>
        <p>Welcome back! Please enter your details </p>
        <form className='auth-form' onSubmit={formik.handleSubmit}>
            <InputBox 
                id="email"
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your Email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
             />
             {formik.touched.email && formik.errors.email ? <div className='error-text'>{formik.errors.email}</div> : null}
             <InputBox 
                id="password"
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
             />
             {formik.touched.password && formik.errors.password ? <div className='error-text'>{formik.errors.password}</div> : null}
             <InputBox 
             id="remember"
             name="remember"
             label="Remember for 30 days"
             type="checkbox"
             onChange={formik.handleChange}
             value={formik.values.checked}
             />
            <Button classname="btn btn-primary" type="button" text="Login" />
        </form>
        </div>
    );
};

export default LoginPage