"use client";

import { useState } from "react";

function MyButton(){
  return (
    <button>add</button>
  )
}
export default function Home() {
  return(
    <div>
      <h1>Welcome to Task.ly</h1>
      <MyButton />
    </div>
  )
}