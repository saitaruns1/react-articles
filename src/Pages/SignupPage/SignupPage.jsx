import React from 'react';
import { useFormik } from 'formik';
import InputBox from '../../components/InputBox/InputBox';
import './style.css'
import { register_user,getCurrentUser } from '../../Authservice';
const initialValues = {
    name: '',
    email: '',
    bio:'',
    password: '',
}

const onSubmit = (values) => {
  console.log(values.password)
    register_user(
        values.name,
        values.email,
        values.bio,
        values.password
      ).then(
        response => {
          console.log(response)
        },
        error => {
          console.log(error)
        }
      );
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
    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    });
    return (<>
        <h3>Create an account</h3>
        <form className='sign-up-form' onSubmit={formik.handleSubmit}>
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
             {formik.touched.name && formik.errors.name ? <div>{formik.errors.name}</div> : null}
            
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
             {formik.touched.bio && formik.errors.bio ? <div>{formik.errors.bio}</div> : null}

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
             {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
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
             {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}
            <button type="submit">Submit</button>
        </form>
        </>
    );
};

export default SignupPage