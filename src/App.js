import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import { Surface } from "react-art";
import Rectangle from "react-art/Rectangle";

const N = 1000;
const posx = [...Array(N)].map((e) => Math.random() * 1000);
const posy = [...Array(N)].map((e) => Math.random() * 1600 - 800);
const sizex = [...Array(N)].map((e) => Math.random() * 50);
const sizey = [...Array(N)].map((e) => Math.random() * 50);

function App() {
  const ref = useRef();
  const [offset, setOffset] = useState(0);
  const scheduled = useRef(false);
  const deltaY = useRef(0);
  useEffect(() => {
    const curr = ref.current;
    if (curr) {
      function onWheel(event) {
        event.preventDefault();
        if (!scheduled.current) {
          scheduled.current = true;
          deltaY.current += event.deltaY;
          window.requestAnimationFrame(() => {
            setOffset((offset) => offset + deltaY.current);
            scheduled.current = false;
            deltaY.current = 0;
          });
        }
      }
      curr.addEventListener("wheel", onWheel);
      return () => curr.removeEventListener("wheel", onWheel);
    }
  }, [offset]);
  return (
    <div ref={ref} className="App">
      <Surface width={1000} height={500}>
        {new Array(N).fill(0).map((elt, index) => {
          return (
            <Rectangle
              key={index}
              x={posx[index]}
              y={posy[index] + offset}
              width={sizex[index]}
              height={sizey[index]}
              fill="red"
            />
          );
        })}
      </Surface>
    </div>
  );
}

export default App;
