import React, { useEffect, useState } from 'react'

const Notes = () => {
  const [loading, setLoading] = useState(false)
  const [notes, setNotes] = useState([])
  const token = localStorage.getItem("psc_app_token")
  const getData = () => {
      fetch("https://frozen-lowlands-38414.herokuapp.com/notes", {
          method : "GET",
          headers : {
              'Authorization' : `Bearer ${token}`
          }
      })
      .then((res) => res.json())
      .then((res) => setNotes(res))
      .catch((err) => console.log(err))
  }
  useEffect(() => {
      getData()
  }, [])
  if(!localStorage.getItem("psc_app_token")){
      return <h1>Please login again</h1>
  }
  return <div>
      <h1>Notes here</h1>
      {
          notes.length > 0 && notes.map((note, index) => {
              return <div key={index}>
                  <p>{note.Heading}</p>
                  <p>{note._id}</p>
                  <p>{note.userId}</p>
                  <button>DELETE</button>
              </div>
          })
      }
  </div>
}

export default Notes