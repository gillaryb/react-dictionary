import React from 'react';


export default function Photos(props){
  console.log(props.photos)
  return (
    <section className="Photos">
      <div className="row">
        {props.photos.map(function(photo,index){
          return (
            <div className="col-4" key={index}>
              <a href={photo.src.original} target="_blank" rel="noreferrer">
                <img src={photo.src.landscape} alt="photos"
                className="img-fluid object-fit-cover rounded mb-4"/>
              </a>
            </div>
          )
        })}
      </div>
    </section>
  )
}
