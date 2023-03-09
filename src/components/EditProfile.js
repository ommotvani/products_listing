// ***** start - import from packages *****
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
// ***** end - import from packages *****

// ***** start - import from files *****
import { editProfileValidationSchema } from '../constants/validationschema'
import { toastErrorMessage, toastSuccessMessage } from '../constants/message'
// ***** start - import from files *****

function EditProfile() {

  // ***** start - define state and variable *****
  const navigate = useNavigate()
  /* The below code is getting the data from the local storage and parsing it to JSON. */
  const oldData = JSON.parse(localStorage.getItem('Auth'))
  const alluser = JSON.parse(localStorage.getItem('Users'))
  // ***** end - define state and variable ****


  const onsubmit = (values) => {

    /* The below code is checking if the email is unique or not. */
    const uniqueUser = alluser.filter((ele) => ele.email !== oldData.email)
    const checkUser = uniqueUser.filter((ele) => ele.email === values.email)

    if (checkUser.length > 0) {
      toast.error(toastErrorMessage.emailExit)
    } else {
      /* Finding the user in the array of users and then updating the user with the new values. */
      const findUser = alluser.find((ele) => ele.email === oldData.email)
      console.log(findUser)
      findUser.firstname = values.firstname
      findUser.lastname = values.lastname
      findUser.email = values.email
      findUser.phoneno = values.phoneno

      /* Setting the data into the local storage. */
      localStorage.setItem("Users", JSON.stringify(alluser))
      localStorage.setItem("Auth", JSON.stringify(findUser))
      toast.success(toastSuccessMessage.profileEditSuccessfully)
    }

  }


  return (
    <div>
      <Formik
        initialValues={oldData}
        validationSchema={editProfileValidationSchema}
        onSubmit={onsubmit}>
        <Form>
          <div className='input_field'>
            <label htmlFor="firstname">FirstName:</label>
            <Field type="text" name="firstname" id="firstname" className="field" />
            <ErrorMessage name="firstname" />
          </div>

          <div className='input_field'>
            <label htmlFor="lastname">LastName:</label>
            <Field type="text" name="lastname" id="lastname" />
            <ErrorMessage name="lastname" />
          </div>

          <div className='input_field'>
            <label htmlFor="email">Email:</label>
            <Field type="text" name="email" id="email" />
            <ErrorMessage name="email" />
          </div>

          <div className='input_field'>
            <label htmlFor="phoneno">Phoneno:</label>
            <Field type="number" name="phoneno" id="phoneno" />
            <ErrorMessage name="phoneno" />
          </div>

          <div className='input_field'>
            <Button type='submit'> Submit </Button>
            <Button type="primary" className='back_btn' onClick={() => navigate("/products")} >back </Button>
          </div>


        </Form>

      </Formik>
    </div>
  )
}

export default EditProfile