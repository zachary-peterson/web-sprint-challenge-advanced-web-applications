import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { useParams } from 'react-router-dom';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const params = useParams();
  
  let updatedColorsList = useState([]);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  console.log(colorToEdit)

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth().put(`/api/colors/${colorToEdit.id}`, colorToEdit)
    .then(res => {
      console.dir(res) 
      // -- resData
      console.log(colors);
      updatedColorsList = colors.map(hue => {
        if(hue.id === res.data.id){
          editColor(res.data)
        }else{
          return hue
        }
      })
      console.log(updatedColorsList)
      updateColors(updatedColorsList);
      
    })
    .catch(err => {
      console.dir(err);
    })
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth().delete(`api/colors/${colorToEdit.id}`)
    .then(res => {
      console.dir(res);
    })
    .catch(err => {
      console.dir(err);
    })
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
