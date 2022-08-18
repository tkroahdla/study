import React, { HtmlHTMLAttributes, useState } from 'react';
import { useForm } from 'react-hook-form';

// function ToDoList() {
//   const [toDo, setToDo] = useState('');
//   const [toDoError, setToDoError] = useState('');
//   const onChange = (e: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = e;
//     setToDo(value);
//   };
//   const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (toDo.length < 10) {
//       return setToDoError('To do should be longer');
//     } else {
//       return setToDoError('');
//     }
//   };
//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input onChange={onChange} value={toDo} placeholder="write a to do" />
//         <button>Add</button>
//         {toDoError}
//       </form>
//     </div>
//   );
// }

interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  password1: string;
  extraError?: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: {
      email: '@naver.com',
    },
  });
  const onValid = (data: IForm) => {
    if (data.password !== data.password1) {
      setError(
        'password1',
        { message: 'Password are not the same' },
        { shouldFocus: true }
      );
    }
    // setError('extraError', { message: 'Server offline.' });
  };
  console.log(errors);
  return (
    <div>
      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register('email', {
            required: {
              value: true,
              message: 'email 채워주세요..',
            },
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com/,
              message: 'naver.com 주소만 허용됩니다.',
            },
          })}
          placeholder="Email"
        />
        <span>{errors?.email?.message}</span>
        <input
          {...register('firstName', { required: true, minLength: 10 })}
          placeholder="First_Name"
        />
        <span>{errors?.firstName?.message}</span>
        <input
          {...register('lastName', {
            required: true,
            validate: {
              noNico: (value) =>
                value.includes('nico') ? 'no nicos allowed' : true,
              noNick: (value) =>
                value.includes('nick') ? 'no nicks allowed' : true,
            },
          })}
          placeholder="Lasg_Name"
        />
        <span>{errors?.lastName?.message}</span>
        <input
          {...register('password', { required: true })}
          placeholder="Password"
        />
        <span>{errors?.password?.message}</span>
        <input
          {...register('password1', {
            required: 'Password is required',
            minLength: {
              value: 5,
              message: '짧다구..',
            },
          })}
          placeholder="Password1"
        />
        <span>{errors?.password1?.message}</span>
        <button>Add</button>
        <span>{errors?.extraError?.message}</span>
      </form>
    </div>
  );
}

export default ToDoList;
