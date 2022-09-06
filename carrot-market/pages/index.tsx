import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <form className="flex flex-col space-y-2 p-5 ">
      <input
        type="text"
        required
        placeholder="Username"
        className="peer rounded-full border border-gray-400 p-1"
      />
      <span className="hidden peer-invalid:block peer-invalid:text-red-500">
        This input is invalid
      </span>
      <span className="hidden peer-valid:block peer-valid:text-teal-500">
        Awesome username
      </span>
      <span className="hidden peer-invalid:text-yellow-500 peer-hover:block">
        Hello
      </span>

      <input type="submit" value="Login" className="bg-white" />
    </form>
  );
};

export default Home;
