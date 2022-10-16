import React from "react";

export default function Cuberow() {
  const a = [1, 2, 3];
  return (
    <div>
      {a.map((i) => (
        <div key={i} className={"cube" + i}></div>
      ))}
    </div>
  );
}
