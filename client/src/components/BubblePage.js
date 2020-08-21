import React, { useState, useEffect } from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { fetchBubbleColors } from '../api/fetchBubbleColors'

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);

  useEffect(() => {
    fetchBubbleColors().then(res => {
      // console.dir(res); -- res.data
      console.dir(res);
      setColorList(res.data);
    })
    .catch(err => {
      console.dir(err);
    });
  }, [])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} fetchBubbleColors={fetchBubbleColors}/>
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
