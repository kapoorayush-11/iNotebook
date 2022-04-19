import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import { useEffect } from 'react';

const About = () => {
  const a = useContext(noteContext);
  useEffect(() => {
    a.update()
    //eslint-disable-next-line
  }, [])
  

  return (
    <div>This is About {a.state.name} and he is in class {a.state.class} </div>
    //humne a.state.name isliye kiya instead of a.name coz agar mei notestate mei jau toh pehale mei direct bhej rha tha value. par abb use state uske kar rha so value ke andar state... uss state ke andar value
  )
}

export default About