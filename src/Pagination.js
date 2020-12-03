import React from 'react'

export default function Pagination({gotoNextPage, gotoPrevPage}) {
  return (
    <div>
      {gotoPrevPage && <button onClick={gotoPrevPage}>Previous</button>}
      {gotoNextPage && <button onClick={gotoNextPage}>Next</button>}
    </div>
  )
}

// make sure first arg is true to ensure it checks the second statement
// will only render prev button as long as there is a prev page to go to
