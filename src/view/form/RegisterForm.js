import React, { useState, useRef } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { RegisterValidationSchema } from '../../constants/validationschema';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import bcrypt from 'bcryptjs'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Col, Row } from 'react-bootstrap';
const eye = <FontAwesomeIcon icon={faEye} />;

function RegisterForm() {

  const passwordInputRef = useRef()
  const navigate = useNavigate()


  const [passwordShown, setPasswordShown] = useState(false);
  const [conformPassword, setConformPassword] = useState(false)

  //toggle button for show password
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  //toggle button for show conform password
  const toggleConformPasswordVisiblity = () => {
    setConformPassword(conformPassword ? false : true);
  }

  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    phoneno: "",
    password: "",
    conformpassword: "",
  }

  const onsubmit = (values) => {

    //encrypt password
    const password = values.password
    const encryptPassword = bcrypt.hashSync(password, 5)
    const result = { ...values, password: encryptPassword, conformpassword: encryptPassword }



    //get data from localstorage
    let oldData = JSON.parse(localStorage.getItem('Users'))



    //compare entered email and locakl storage email

    if (oldData) {
      const user = oldData.find(ele => {
        return ele.email === values.email
      })

      if (user) {
        toast.error("email already exit")
      }
      else {
        const newData = [...oldData, result]
        localStorage.setItem("Users", JSON.stringify(newData));
        navigate("/")
      }

    }
    else {
      localStorage.setItem("Users", JSON.stringify([result]));
      navigate("/")
    }

  }


  return (
    <div className='navbar_section'>
 <div >
      <Formik
        initialValues={initialValues}
        validationSchema={RegisterValidationSchema}
        onSubmit={onsubmit}>
        <Form>
          
          <div className='mt-5'>         
           <label htmlFor="firstname">FirstName:</label>
           <Field type="text" name="firstname" id="firstname" className="mb-4 ms-3 inputfield" />
            <ErrorMessage name="firstname" />
            </div>
           

          <div>
            <label htmlFor="lastname">LastName:</label>
            <Field type="text" name="lastname" id="lastname" className="mb-4 ms-3 inputfield"/>
            <ErrorMessage className='errormsg' name="lastname" />
          </div>

          <div >
            <label htmlFor="email">Email:</label>
            <Field type="text" name="email" id="email" className="mb-4 ms-3 inputfield"/>
            <ErrorMessage name="email" />
          </div>

          <div>
            <label htmlFor="phoneno">Phoneno:</label>
            <Field type="number" name="phoneno" id="phoneno" className="mb-4 ms-3 inputfield"/>
            <ErrorMessage name="phoneno" />
          </div>

          <div>
            <label htmlFor="password">Paasword:</label>
            <Field type={passwordShown ? "text" : "password"} name="password" id="password" ref={passwordInputRef} className="mb-4 ms-3 inputfield"/>
            <i onClick={togglePasswordVisiblity}>{eye}</i>{" "}
            <ErrorMessage name="password" />
          </div>

          <div>
            <label htmlFor="conformpassword">Conformpassword:</label>
            <Field type={conformPassword ? "text" : "password"} name="conformpassword" id="conformpassword" className="mb-4 ms-3 inputfield" />
            <i onClick={toggleConformPasswordVisiblity}>{eye}</i>
            <ErrorMessage name="conformpassword" />
          </div>

          <div className="mb-2  ml-5 register_btn">
            <button type='submit'>Signup</button>
          </div>
        </Form>

      </Formik>
    </div>
    </div>
   
  )
}

export default RegisterForm