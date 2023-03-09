// ***** start - import from packages *****
import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye } from "@fortawesome/free-solid-svg-icons"
import { toast } from 'react-toastify'
import bcrypt from "bcryptjs"
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
// // ***** end - import from packages *****

// ***** start - import from files *****
import { resetPasswordValidationSchema } from '../constants/validationschema'
import { toastErrorMessage, toastSuccessMessage } from '../constants/message'


function ResetPassword() {
    const eye = <FontAwesomeIcon icon={faEye} />

    // ***** start - define state and variable *****
    const navigate = useNavigate()
    const [passwordShown, setPasswordShown] = useState(false)
    const [newPassowrd, setNewPassowrd] = useState(false)
    const [conformPassowrd, setConformPassowrd] = useState(false)
    // ***** end - define state and variable *****


    // toggel eye button shown or hid functionality 

    const togglePasswordVisiblity = () => {
        setPasswordShown(!passwordShown)
    }

    const newPasswordVisiblity = () => {
        setNewPassowrd(!newPassowrd)
    }
    const conformPasswordVisiblity = () => {
        setConformPassowrd(!conformPassowrd)
    }

    //initial values of passwords 
    const initialValues = {
        oldPassword: '',
        newpassword: '',
        conformNewPassword: ''
    }
    const onsubmit = async (values) => {


        /* The below code is getting the data from the local storage and parsing it into a JSON object. */

        const registerUsersData = JSON.parse(localStorage.getItem("Users"))
        const userData = JSON.parse(localStorage.getItem("Auth"))


        /* Comparing the old password with the password in the database. */
        const isPasswordExit = await bcrypt.compare(values.oldPassword, userData.password)
        console.log(isPasswordExit)

        if (isPasswordExit) {

            //compare current password and new password 
            const matchpassword = values.oldPassword === values.newpassword

            if (matchpassword) {
                toast.error(toastErrorMessage.passwordAlredyExit)
            } else {
                toast.success(toastSuccessMessage.changePasswordSuccessfully)

                //find user from register user array threw find method 
                const filterRegisterUsers = registerUsersData.find(ele => ele.email === userData.email)


                //encrypt new password 
                const salt = bcrypt.genSaltSync(10)
                const encryptPass = bcrypt.hashSync(values.newpassword, salt)

                //pass encrypted values to filtered register user
                filterRegisterUsers.password = encryptPass
                filterRegisterUsers.conformpassword = encryptPass

                //set updated passsword in register users array and login object 
                const result = ({ ...userData, password: encryptPass, conformpassword: encryptPass })
                localStorage.setItem("Auth", JSON.stringify(result))
                localStorage.setItem("Users", JSON.stringify(registerUsersData))
            }
        } else {
            toast.error("password is wrong")
        }
    }


    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={resetPasswordValidationSchema}
                onSubmit={onsubmit}>
                <Form>

                    <div className='input_field'>
                        <label htmlFor="oldPassword">OldPaasword:</label>
                        <Field type={passwordShown ? "text" : "password"} name="oldPassword" id="oldPassword" />
                        <i onClick={togglePasswordVisiblity}>{eye}</i>{" "}
                        <ErrorMessage name="password" />
                    </div>

                    <div className='input_field'>
                        <label htmlFor="newpassword">NewPassword:</label>
                        <Field type={newPassowrd ? "text" : "password"} name="newpassword" id="newpassword" />
                        <i onClick={newPasswordVisiblity}>{eye}</i>{" "}
                        <ErrorMessage name="password" />
                    </div>


                    <div className='input_field'>
                        <label htmlFor="conformNewPassword">conformNewPassword:</label>
                        <Field type={conformPassowrd ? "text" : "password"} name="conformNewPassword" id="conformNewPassword" />
                        <i onClick={conformPasswordVisiblity}>{eye}</i>{" "}
                        <ErrorMessage name="password" />
                    </div>


                    <div className='input_field'>
                        <Button type='submit'>update</Button>
                        <Button type="primary" className='back_btn' onClick={() => navigate("/products")} >back </Button>
                    </div>


                </Form>

            </Formik>
        </div>
    )
}

export default ResetPassword