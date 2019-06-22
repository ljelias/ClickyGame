import React from "react";
import "./style.css";

function ImageCard(props) {
  return (
        <img src={props.image} alt={props.name} id={props.id} className="w3-card-4"  
        //onClick={() => props.shufflePics(props.id)}
        />
  );
}

export default ImageCard;

