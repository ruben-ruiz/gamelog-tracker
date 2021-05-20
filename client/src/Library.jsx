import React, {useState, useEffect} from 'react';

const Library= () => {
  return (
    <div className="library">
      <div className="backlog"></div>
      <div className="playing"></div>
      <div className="completed"></div>
    </div>
  )
}

export default Library;