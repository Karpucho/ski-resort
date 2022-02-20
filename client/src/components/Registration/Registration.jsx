import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { authUser } from '../../redux/actionCreators/userAC';
import { isValidPassword, isValidName, isValidEmail } from '../../helpers/isValid'



function Registration(props) {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const name = useRef()
  const email = useRef()
  const password = useRef()
  const passwordRepeat = useRef()
  const [areSamePasswords, setAreSamePasswords] = useState(false)
  const [isCorrectName, setIsCorrectName] = useState(false)
  const [isCorrectEmail, setIsCorrectEmail] = useState(false)
  const [isCorrectPassword, setIsCorrectPassword] = useState(false)

  const checkName = () => {
    setIsCorrectName(isValidName(name.current.value))
  }

  const checkEmail = () => {
    setIsCorrectEmail(isValidEmail(email.current.value))
  }

  const checkPassword = () => {
    setIsCorrectPassword(isValidPassword(password.current.value))
  }

  const checkPasswords = () => {
    (password.current.value && password.current.value === passwordRepeat.current.value) ? setAreSamePasswords(true) : setAreSamePasswords(false)
  }

  const registration = async (event) => {
    event.preventDefault();

    if (isCorrectName && isCorrectEmail && isCorrectPassword && areSamePasswords) {
      const body = JSON.stringify({
        name: name.current.value,
        email: email.current.value,
        password: password.current.value
      });

      const response = await fetch('/api/registration', {
        method: 'POST',
        body,
        headers: { 'Content-Type': 'application/json' }
      })
        .catch(console.error)

      switch (response.status) {
        case 200:
          const { token } = await response.json()
          localStorage.setItem('auth_token', token);
          dispatch(authUser())
          return navigate('/')
        case 400:
          return window.alert('Wrong data')
        case 501:
          return window.alert('E-mail is taken')
        default:
          const { error } = await response.json()
          console.log(error);
          return window.alert('Error')
      }
    }
  }

  return (
    <form onSubmit={registration} className="w-96">
      <div className="mb-6">
        <label htmlform="name" className="block mb-2 text-sm font-medium text-gray-900 ">Your name</label>
        <input ref={name} onChange={checkName} name="name" type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required="" />
        {(isCorrectName) ?
          <span className="block mb-2 text-sm font-medium text-green-500 ">Name is correct</span>
          :
          <span className="block mb-2 text-sm font-medium text-red-500">Up to 20 letters or digits</span>
        }
      </div>
      <div className="mb-6">
        <label htmlform="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
        <input ref={email} onChange={checkEmail} name="email" type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="name@mail.com" required="" />
        {(isCorrectEmail) ?
          <span className="block mb-2 text-sm font-medium text-green-500 ">Email is correct</span>
          :
          <span className="block mb-2 text-sm font-medium text-red-500 ">Email is not correct</span>
        }
      </div>
      <div className="mb-6">
        <label htmlform="password" className="block mb-2 text-sm font-medium text-gray-900 ">Your password</label>
        <input name="password" ref={password} onChange={() => { checkPasswords(); checkPassword() }} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required="" />
        {(isCorrectPassword) ?
          <span className="block mb-2 text-sm font-medium text-green-500 ">Password is correct</span>
          :
          <span className="block mb-2 text-sm font-medium text-red-500 ">3 to 20 uppercase and lowercase letters and digits</span>
        }
      </div>
      <div className="mb-6">
        <label htmlform="passwordRepeat" className="block mb-2 text-sm font-medium text-gray-900 ">Repeat password</label>
        <input name="passwordRepeat" ref={passwordRepeat} onChange={checkPasswords} type="password" id="passwordRepeat" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required="" />
        {(areSamePasswords) ?
          <span className="block mb-2 text-sm font-medium text-green-500 ">Passwords are same </span>
          :
          <span className="block mb-2 text-sm font-medium text-red-500 ">Passwords are different</span>
        }
      </div>
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Sign-up</button>
    </form>
  );
}

export default Registration;
