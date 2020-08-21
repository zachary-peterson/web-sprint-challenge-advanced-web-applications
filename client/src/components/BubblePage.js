import React, { useState, useEffect } from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  

  const fetchBubbleColors = () => {
    axios.get('/api/colors')
    .then(res => {
      console.dir(res);
    })
    .catch(err => {
      console.dir(err);
    })
  }

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
