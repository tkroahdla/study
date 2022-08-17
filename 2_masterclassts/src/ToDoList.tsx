import React, { HtmlHTMLAttributes, useState } from 'react';

function ToDoList() {
  const [toDo, setToDo] = useState('');
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setToDo(value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(toDo);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={toDo} placeholder="write a to do" />
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
