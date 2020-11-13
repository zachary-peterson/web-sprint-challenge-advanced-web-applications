import React, { useState } from "react";
import axios from "axios";
import styled from 'styled-components'
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { useParams } from 'react-router-dom';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const colorAdd = {
  color: '',
  code: {
    hex: ''
  }
};

const AddForm = styled.form`
width: 100%;
margin: o auto;
display: flex;
text-align: center;
justify-content: center;
align-items: center;

  form {
    margin: o auto;
  }
`

const ColorList = ({ colors, updateColors, fetchBubbleColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(colorAdd);
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
      // console.dir(res)
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
      fetchBubbleColors();
    })
    .catch(err => {
      console.dir(err);
    })
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth().delete(`api/colors/${color.id}`)
    .then(res => {
      // console.dir(res);
      updatedColorsList = colors.map(hue => {
        if(hue.id !== res.data.id){
          return hue;
        }
      })

      updateColors(updatedColorsList);
      fetchBubbleColors();
    })
    .catch(err => {
      console.dir(err);
    })
  };

  const handleChanges = e => {
    setColorToAdd({...colorToAdd, [e.target.name]: e.target.value});
  }

  const handleHex = e => {
    setColorToAdd({
      ...colorToAdd,
      code: { [e.target.name]: e.target.value }
    })
  }

  const addColor = e => {
    e.preventDefault();
    axiosWithAuth().post('api/colors', colorToAdd)
    .then(res => {
      // console.dir(res);
      updateColors(res.data);
    })
    .catch(err => {
      console.dir(err);
    })
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li data-testid='bubbles' key={color.color} onClick={() => editColor(color)}>
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
      <div>
        <AddForm>
              <label htmlFor='newColor'>Color to Add:</label>
              <input
                type='text'
                name='color'
                value={colorToAdd.color}
                onChange={handleChanges}
                placeholder='Color Name'
              />

              <label htmlFor='newHex'>HEX Code:</label>
              <input
                type='text'
                name='hex'
                value={colorToAdd.code.hex}
                onChange={handleHex}
                placeholder='HEX Code'
              />

              <button onClick={addColor}>Add</button>
              <button>Clear</button>
        </AddForm>
      </div>
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
      
    </div>
  );
};

export default ColorList;
