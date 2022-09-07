import { FieldError, FieldErrors, useForm } from 'react-hook-form';

// Less cod
// Better validation
// Better Errors (set, clear, display)
// Have control over inputs
// Dont deal with events
// Easier Inputs
interface LoginForm {
  username: string;
  password: string;
  email?: string;
  errors?: string;
}

export default function Forms() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    reset,
    resetField,
  } = useForm<LoginForm>({
    mode: 'onChange',
  });
  const onValid = (data: LoginForm) => {
    console.log('im valid bby');
    setError('errors', { message: 'Backed is offline sorry.' });
    // reset();
    resetField('password');
  };
  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };
  console.log(errors);
  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)}>
      <input
        {...register('username', {
          required: 'username is required',
          minLength: 5,
        })}
        type="text"
        placeholder="Username"
      />
      <input
        {...register('email', {
          required: 'email is required',
          validate: {
            notGmail: (value) =>
              !value?.includes('@gmail.com') ? '' : 'Gmail is not allowed',
          },
        })}
        type="email"
        placeholder="Email"
        className={`${Boolean(errors.email?.message) ? 'border-red-100' : ''}`}
        style={{ borderWidth: '1px' }}
      />
      {errors.email?.message}
      <input
        {...register('password', {
          required: 'password is required',
        })}
        type="password"
        placeholder="Password"
      />
      <input type="submit" value="Create Account" />
      {errors.errors?.message}
    </form>
  );
}
