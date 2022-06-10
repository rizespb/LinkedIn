import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from './features/userSlice'
import { auth } from './firebase'
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [profilePic, setProfilePic] = useState('')
  const dispatch = useDispatch()

  // Фнуккция для логина
  const loginToApp = (e) => {
    e.preventDefault()
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
            photoUrl: userAuth.user.photoUrl,
          })
        )
      })
      .catch((error) => alert(error))
  }

  // Фнуккция для регистрации
  const register = () => {
    if (!name) {
      return alert('Please enter a full name')
    }

    // Создаем юзера с помощью email и пароля через auth из firebase
    // После того, как юзер создан, обновляем профайл юзера в БД, добавляя ему имя и урл фото из формы
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userAuth) => {
        userAuth.user.updateProfile({
          displayName: name,
          photoURL: profilePic,
        })

        return userAuth
      })
      // Т.к. в App.jsx мы навешиваем обработчик на изменение состояния авторизации, который сохраняет в Редакс данные о пользователе, я считю, что здесь диспатчить данные о пользователе избыточно
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: name,
            photoUrl: profilePic,
          })
        )
      })
      .catch((error) => {
        alert(error)
      })
  }

  return (
    <div className="login">
      <img src="https://logos-world.net/wp-content/uploads/2020/04/Linkedin-Logo-2011-2019.png" alt="" />

      <form>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name (required if registering)"
          type="text"
        />

        <input
          value={profilePic}
          onChange={(e) => setProfilePic(e.target.value)}
          placeholder="Profile pic URL (optional)"
          type="text"
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="text"
          className="bg-blue"
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          className="bg-blue"
        />

        <button type="submit" onClick={loginToApp}>
          Sigh In
        </button>
      </form>

      <p>
        Not a member?{' '}
        <span className="login__register" onClick={register}>
          Register Now
        </span>
      </p>
    </div>
  )
}

export default Login
