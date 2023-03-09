/* Importing the entire Yup library. */
import * as Yup from 'yup'

/* Importing from files. */
import {PASSWORD_MIN_CHARACTER, PASSWORD_MAX_CHARACTER} from './constants'
import {ErrorMessage} from './message'
import {PASSWORD_REGEX, MOBILE_NUMBER_REGEX, EMAIL_NUMBER} from './constantregex'

/* A validation schema for the registration form. */
export const RegisterValidationSchema = Yup.object({
    firstname:Yup.string().required(ErrorMessage.firstNameRequired),
    lastname:Yup.string().required(ErrorMessage.lastNameRequired),
    email:Yup.string().required(ErrorMessage.emailRequired).email(ErrorMessage.emailValid).matches(EMAIL_NUMBER, ErrorMessage.emailValid),
    phoneno:Yup.string().required(ErrorMessage.mobilenoRequired).matches(MOBILE_NUMBER_REGEX, ErrorMessage.mobilenoValid),
    password:Yup.string().required(ErrorMessage.passwordRequired).min(PASSWORD_MIN_CHARACTER, ErrorMessage.passwordMinCharacter).max(PASSWORD_MAX_CHARACTER, ErrorMessage.passwordMaxCharacter).matches(PASSWORD_REGEX, ErrorMessage.passwordValid),
    conformpassword:Yup.string().oneOf([Yup.ref('password')], ErrorMessage.conformPassword).required(ErrorMessage.passwordRequired)
})


/* Creating a validation schema for the login form. */
export const loginValidationSchema = Yup.object({
    email:Yup.string().required(ErrorMessage.emailRequired).email(ErrorMessage.emailValid).matches(EMAIL_NUMBER, ErrorMessage.emailValid),
    password:Yup.string().required(ErrorMessage.passwordRequired).min(PASSWORD_MIN_CHARACTER, ErrorMessage.passwordMinCharacter).max(PASSWORD_MAX_CHARACTER, ErrorMessage.passwordMaxCharacter).matches(PASSWORD_REGEX, ErrorMessage.passwordValid)
})

/* Creating a validation schema for the reset password form. */
export const resetPasswordValidationSchema = Yup.object({
    oldPassword:Yup.string().required(ErrorMessage.passwordRequired).min(PASSWORD_MIN_CHARACTER, ErrorMessage.passwordMinCharacter).max(PASSWORD_MAX_CHARACTER, ErrorMessage.passwordMaxCharacter).matches(PASSWORD_REGEX, ErrorMessage.passwordValid),
    newpassword:Yup.string().required(ErrorMessage.passwordRequired).min(PASSWORD_MIN_CHARACTER, ErrorMessage.passwordMinCharacter).max(PASSWORD_MAX_CHARACTER, ErrorMessage.passwordMaxCharacter).matches(PASSWORD_REGEX, ErrorMessage.passwordValid),
    conformNewPassword:Yup.string().oneOf([Yup.ref('newpassword')], ErrorMessage.conformPassword).required(ErrorMessage.passwordRequired)
})


/* Creating a validation schema for the edit profile form. */
export const editProfileValidationSchema = Yup.object({
    firstname:Yup.string().required(ErrorMessage.firstNameRequired),
    lastname:Yup.string().required(ErrorMessage.lastNameRequired),
    email:Yup.string().required(ErrorMessage.emailRequired).email(ErrorMessage.emailValid).matches(EMAIL_NUMBER, ErrorMessage.emailValid),
    phoneno:Yup.string().required(ErrorMessage.mobilenoRequired).matches(MOBILE_NUMBER_REGEX, ErrorMessage.mobilenoValid)
})