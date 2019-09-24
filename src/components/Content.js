import React from 'react';


const Content = props => {
  return (
      <div className="content-container">
          {props.component ? props.component : ""}
      </div>
  )
};