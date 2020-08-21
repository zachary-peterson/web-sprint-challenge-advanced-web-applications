import React, { useState, useEffect } from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);

  const fetchBubbleColors = () => {
    axiosWithAuth().get('/api/colors')
    .then(res => {
      // console.dir(res); -- res.data
      setColorList(res.data);
    })
    .catch(err => {
      console.dir(err);
    })
  }

  useEffect(() => {
    fetchBubbleColors();
  }, [])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} fetchBubbleColors={fetchBubbleColors}/>
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
