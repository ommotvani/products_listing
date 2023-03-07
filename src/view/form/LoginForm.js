import React, {  useEffect, useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { loginValidationSchema } from '../../constants/validationschema'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye } from "@fortawesome/free-solid-svg-icons"
import { toast } from 'react-toastify'
import bcrypt from 'bcryptjs'

const eye = <FontAwesomeIcon icon={faEye} />

function LoginForm({setFlag, flag}) {
    const navigate = useNavigate()
    

    const [passwordShown, setPasswordShown] = useState(false)

    useEffect(() => {
        const authData = JSON.parse(localStorage.getItem("Auth"))
        if (authData) {
          navigate("/products")
        }
      }, [])

    const initialValues = {
        email: "",
        password: ""
    }


    const handlesubmit = (values) => { 
     /* Getting the data from the local storage. */
        const oldData = JSON.parse(localStorage.getItem('Users'))

       
        /* This is checking if the user exists in the database. */
        const user = oldData.find((ele) => ele.email === values.email)
        if (!user) {
            toast.error("error")
        }


       /* Comparing the password and confirm password. */
        bcrypt.compare(values.password, user.password, function (error, isMatch) {
            if (error) {
                console.log("error ")
            } else if (!isMatch) {
                toast.error("password is not match")
            } else {

                /* Setting the data in the local storage and navigating to the products page. */
                const result = { ...user, password: user.password}
                localStorage.setItem("Auth", JSON.stringify(result))
                setFlag(!flag)
                navigate("/products")
            }
        })
    }
   
    /**
     * If the password is shown, hide it. If the password is hidden, show it
     */
    const togglePasswordVisiblity = () => {
        setPasswordShown(!passwordShown)
    }

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