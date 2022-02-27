import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Switch } from '@headlessui/react'

import { loginUser } from '../../redux/sagaCreators/userSagaCreators';
import { isValidPassword, isValidEmail } from '../../helpers/isValid'


function Login(props) {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const email = useRef()
  const password = useRef()

  const [isCorrectEmail, setIsCorrectEmail] = useState(false)
  const [isCorrectPassword, setIsCorrectPassword] = useState(false)

  const login = (event) => {
    event.preventDefault();

    if (isCorrectEmail && isCorrectPassword) {
      const data = {
        role: 'admin',
        email: email.current.value,
        password: password.current.value
      };

      return dispatch(loginUser(data, navigate))
    }
  }

  const checkEmail = () => {
    setIsCorrectEmail(isValidEmail(email.current.value))
  }

  const checkPassword = () => {
    setIsCorrectPassword(isValidPassword(password.current.value))
  }


  return (
    <form onSubmit={login} className="w-96">
      <div className="mb-2">
        <label htmlform="email" className="block mb-2 text-sm font-medium text-gray-900">E-mail</label>
        <input ref={email} onChange={checkEmail} name="email" type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="name@mail.com" required="" />
        {(isCorrectEmail) ?
          <span className="block mb-2 text-sm font-medium text-green-500 ">✓</span>
          :
          <span className="block mb-2 text-sm font-medium text-red-500 ">Некорректеный e-mail</span>
        }
      </div>
      <div className="mb-2">
        <label htmlform="password" className="block mb-2 text-sm font-medium text-gray-900 ">Пароль</label>
        <input name="password" ref={password} onChange={checkPassword} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required="" />
        {(isCorrectPassword) ?
          <span className="block mb-2 text-sm font-medium text-green-500 ">✓</span>
          :
          <span className="block mb-2 text-sm font-medium text-red-500 ">Заглавные и строчные латинские буквы и цифры от 3 до 20</span>
        }
      </div>
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Воти как администратор</button>
    </form>
  );
}

export default Login;