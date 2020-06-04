import React from 'react'

const Rank = ({name, entries}) => {
  return (
    <div>
      <div style={{fontSize:'20px'}}>
        {`${name}, the number of faces you've detected is...`}
      </div>
      <div style={{fontSize:'28px'}}>
        {entries}
      </div>
    </div>
  );
}

export default Rank;