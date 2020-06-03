import React from 'react'

const Rank = ({name, entries}) => {
  return (
    <div>
      <div style={{fontSize:'20px'}}>
        {`${name}, your current rank is...`}
      </div>
      <div style={{fontSize:'28px'}}>
        {entries}
      </div>
    </div>
  );
}

export default Rank;