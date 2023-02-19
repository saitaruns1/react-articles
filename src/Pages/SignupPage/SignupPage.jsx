import React from 'react';
import { useFormik } from 'formik';
import InputBox from '../../components/InputBox/InputBox';
import './style.css'
import { register_user } from '../../Authservice';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
const initialValues = {
    name: '',
    email: '',
    bio:'',
    password: '',
}



const validate = values => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Required';
    } else if (values.name.length > 15) {
      errors.name = 'Must be 15 characters or less';
    }

    if (!values.bio) {
      errors.bio = 'Required';
    }
  
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

const SignupPage = () => {
  const navigate = useNavigate()

  const onSubmit = (values) => {
    console.log(values.password)
      register_user(
          values.name,
          values.email,
          values.bio,
          values.password
        ).then(
          response => {
            navigate("/login");
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
        <h1>Create an account</h1>
        <form className='auth-form' onSubmit={formik.handleSubmit}>
            <InputBox 
                id="name"
                name="name"
                label="Name"
                type="text"
                placeholder="Enter your Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
             />
             {formik.touched.name && formik.errors.name ? <div className='error-text'>{formik.errors.name}</div> : null}
            
             <InputBox 
                id="bio"
                name="bio"
                label="Bio"
                type="text"
                placeholder="Enter your Bio"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.bio}
             />
             {formik.touched.bio && formik.errors.bio ? <div className='error-text'>{formik.errors.bio}</div> : null}

            <InputBox 
                id="email"
                name="email"
                type="email"
                label="Email"
                placeholder="Enter your Email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
             />
             {formik.touched.email && formik.errors.email ? <div className='error-text'>{formik.errors.email}</div> : null}
             <InputBox 
                id="password"
                name="password"
                type="password"
                label="Password"
                placeholder="Enter your Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
             />
             {formik.touched.password && formik.errors.password ? <div className='error-text'>{formik.errors.password}</div> : null}
            <Button classname="btn btn-primary" type="submit" text={"Sign Up"} />
        </form>
        </div>
    );
};

export default SignupPage