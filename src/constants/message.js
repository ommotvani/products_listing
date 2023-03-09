import {PASSWORD_MIN_CHARACTER, PASSWORD_MAX_CHARACTER} from './constants'


/* A constant variable which is used to show error message. */
export const ErrorMessage = {
    emailValid: 'Please enter valid email.',
    emailRequired: 'Please enter email.',
    passwordRequired: 'Please enter password.',
    passwordMinCharacter: `Please enter minimum ${PASSWORD_MIN_CHARACTER} characters.`,
    passwordMaxCharacter: `Please enter maximum ${PASSWORD_MAX_CHARACTER} characters.`,
    passwordValid: 'Password require at least one uppercase character, one lowercase character, one number and one special(@$!%*?&) character.',
    conformPassword:'Passsword is not Same',
    firstNameRequired: 'Please enter first name.',
    lastNameRequired: 'Please enter last name.',
    mobilenoRequired: 'Please enter Mobolie number.',
    mobilenoValid: 'Please enter valid mobile number.'
}

/* A constant variable which is used to show error message. */
export const toastErrorMessage = { 
    emailExit:'email already exit',
    userNotfound:'user not fount please signup first',
    emialNotexit:'email is not exit',
    passwordAlredyExit:'password already exits',
    passwordIsWrong:"password is wrong"
}

/* A constant variable which is used to show success message. */
export const toastSuccessMessage = {
    registerSuccessfully:"register successfully",
    loginSuccessfully: 'User login successfully.',
    profileEditSuccessfully: 'Profile edit successfully.',
    changePasswordSuccessfully: 'Password update successfully.'
}