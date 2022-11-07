import { useState, useEffect } from "react";
import { v4 as uuid } from 'uuid';
import { randomColor } from 'randomcolor';
import Draggable from 'react-draggable';

function App() {
  const [item, setItem] = useState('');
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem('items')) || []
  );

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items))
  }, [items])

  const newItemHandler = () => {
    if (item.trim() !== '') {
      const newItem = {
        id: uuid(),
        title: item,
        color: randomColor({
          luminosity: 'light'
        }),
        defaultPos: {
          x: 650,
          y: -600
        }
      }
      setItems((items) => {
        return [
          ...items,
          newItem
        ]
      })
      setItem('')
    } else {
      alert('Enter something')
      setItem('')
    }
  }
  const deleteNode = (id) => {
    setItems(items.filter((item) => item.id !== id))
  }
  const updatePos = (data, index) => {
    let newArray = [...items]
    newArray[index].defaultPos = { x: data.x, y: data.y }
    setItems(newArray)
  }
  return (
    <div className="app">
      <div className="wrapper">
        <input
          value={item}
          onChange={e => setItem(e.target.value)}
          type='text'
          placeholder='Enter something'
        ></input>
        <button onClick={newItemHandler} className="enter">ENTER</button>
      </div>
      {items.map((item, index) => {
        return (
          <Draggable
            key={index}
            defaultPosition={item.defaultPos}
            onStop={(_, data) => {
              updatePos(data, index)
            }}>
            <div className="todo__item" style={{ backgroundColor: item.color }}>
              {`${item.title}`}
              <button
                className="delete"
                onClick={() => deleteNode(item.id)}
              >X</button>
            </div>
          </Draggable>
        )
      })}
    </div>
  );
}

export default App;
