import React from 'react';
import { useFormik } from 'formik';
import InputBox from '../../components/InputBox/InputBox';
import './style.css'
import { login_user } from '../../Authservice';

const initialValues = {
    email: '',
    password: '',
    checked: false,
}

const onSubmit = (values) => {
    login_user(values.email, values.password).then(
        (response) => {
        //   this.props.router.navigate("/profile");
        //   window.location.reload();
        console.log(response)
        },
        error => {
          console.log(error)
        }
      );
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

const SignupPage = () => {
    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    });
    return (<>
        <h3>Log in to your account</h3>
        <p>Welcome back! Please enter your details </p>
        <form className='log-in-form' onSubmit={formik.handleSubmit}>
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
             {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
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
             {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}
             <InputBox 
             id="remember"
             name="remember"
             label="Remember for 30 days"
             type="checkbox"
             onChange={formik.handleChange}
             value={formik.values.checked}
             />
            <button type="submit">Login</button>
        </form>
        </>
    );
};

export default SignupPage