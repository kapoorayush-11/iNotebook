import React from 'react'

const Noteitem = (props) => {
   const {note} = props;
  return (
    <div className = "col-md-3">

    <div class="card my-3 mx-3">
  <div class="card-body">
    <h5 class="card-title">{note.title}</h5>
    <p class="card-text">{note.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime nobis corporis eos sed iure debitis, enim doloremque quod at vero nulla aliquid similique quis tempore! Iure aperiam quod asperiores quidem facilis debitis? Nam, quos.</p>

  </div>
</div>
    
    </div>
  )
}

export default Noteitem