import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './Feed.css'
import CreateIcon from '@mui/icons-material/Create'
import ImageIcon from '@mui/icons-material/Image'
import SubscriptionsIcon from '@mui/icons-material/Subscriptions'
import EventNoteIcon from '@mui/icons-material/EventNote'
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay'
import InputOption from './InputOption'
import Post from './Post'
import { db } from './firebase'
import firebase from 'firebase'
import { selectUser } from './features/userSlice'
import FlipMove from 'react-flip-move'

// FOR FIREBASE VER. 8.X.X
// import { collection, getDocs, addDoc, serverTimestamp, orderBy, query } from 'firebase/firestore/lite'

const Feed = () => {
  const [input, setInput] = useState('')
  const [posts, setPosts] = useState([])
  const user = useSelector(selectUser)

  /* ----------------------------------------------------
  --------------- FOR FIREBASE VER. 8.X.X ---------------
  -------------------------------------------------------
  const getPosts = async () => {
    const postsCollection = collection(db, 'posts')

    // в orderBy первый параметр - по какому полю сортировать, второй параметр - порядок сортировки
    const postsSnapShot = await getDocs(query(postsCollection, orderBy('timestamp', 'desc')))

    const postsFromDb = postsSnapShot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }))

    setPosts(postsFromDb)
  }

  useEffect(() => {
    getPosts()
  }, [])

  const sendPost = async (event) => {
    event.preventDefault()

    await addDoc(collection(db, 'posts'), {
      name: 'Alex Rizespb',
      description: 'this is a test',
      message: input,
      photoUrk: '',
      timestamp: serverTimestamp(),
    })
    getPosts()
    setInput('')
  }

  ---------------------------------------------------- */

  useEffect(() => {
    // onSnapshot - этот метод подписывает нас на обновлении БД
    // Когда в облаке обновляется БД (добавление/удаление данных), каждый раз будет вызываться колбэк, переданный в onSnapShot
    // в orderBy первый параметр - по какому полю сортировать, второй параметр - порядок сортировки
    db.collection('posts')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      )
  }, [])

  const sendPost = async (event) => {
    event.preventDefault()

    db.collection('posts').add({
      name: user.displayName,
      description: user.email,
      message: input,
      photoUrl: user.photoUrl || '',
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })

    setInput('')
  }

  return (
    <div className="feed">
      <div className="feed__inputContainer">
        <div className="feed__input">
          <CreateIcon />
          <form>
            <input value={input} onChange={(e) => setInput(e.target.value)} type="text" />
            <button onClick={sendPost} type="submit">
              Send
            </button>
          </form>
        </div>

        <div className="feed__inputOptions">
          <InputOption Icon={ImageIcon} title="Photo" color="#70b5f9" />
          <InputOption Icon={SubscriptionsIcon} title="Video" color="#e7a33e" />
          <InputOption Icon={EventNoteIcon} title="Event" color="#c0cbcd" />
          <InputOption Icon={CalendarViewDayIcon} title="Whrite article" color="#7fc15e" />
        </div>
      </div>

      {/* Posts */}
      <FlipMove>
        {posts.map(({ id, data: { name, description, message, photoUrl } }) => (
          <Post key={id} name={name} description={description} message={message} photoUrl={photoUrl} />
        ))}
      </FlipMove>
    </div>
  )
}

export default Feed
