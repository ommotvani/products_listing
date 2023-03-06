import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { loginValidationSchema } from '../../constants/validationschema';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';
import bcrypt from 'bcryptjs';

const eye = <FontAwesomeIcon icon={faEye} />;

function LoginForm() {
    const navigate = useNavigate()

    const [passwordShown, setPasswordShown] = useState(false);

    const initialValues = {
        email: "",
        password: "",
    }


    const handlesubmit = (values) => {
        //get data of rtegister user and login user from local storage 

        let oldData = JSON.parse(localStorage.getItem('Users'))

        //compare entered email and local storage email
        const user = oldData.find((ele) => ele.email === values.email)
        if (!user) {
            toast.error("error")
        }


        //comare password and conform password 
        bcrypt.compare(values.password, user.password, function (error, isMatch) {
            if (error) {
                console.log("error ")
            }
            else if (!isMatch) {
                toast.error("password is not match")
            }
            else {
                // set data in login auth in local storage and navigate to products page
                const result = { ...user, password: user.password, }
                localStorage.setItem("Auth", JSON.stringify(result));
                navigate("/products")
            }
        });
    }

    // if user is allready logged then redirect to products
    useEffect(() => {
        let authData = JSON.parse(localStorage.getItem("Auth"))
        if (authData) {
            navigate("/products")
        }
    }, [])

    //toggel button for shaow and hide pwd 
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={loginValidationSchema}
                onSubmit={handlesubmit}>
                <Form>
                    <div className='input_field'>
                        <label htmlFor="email">Email:</label>
                        <Field type="text" name="email" id="email" />
                        <ErrorMessage name="email" />
                    </div>



                    <div className='input_field'>
                        <label htmlFor="password">Paasword:</label>
                        <Field type={passwordShown ? "text" : "password"} name="password" id="password" />
                        <i onClick={togglePasswordVisiblity}>{eye}</i>{" "}
                        <ErrorMessage name="password" />
                    </div>


                    <div className='input_field'>
                        <button type='submit' className='login_btn'>login</button> <NavLink to="/register" className="back_btn">dont have account?</NavLink>
                    </div>


                </Form>

            </Formik>


        </div>
    )
}

export default LoginForm