export const LoginForm = () => {
  return (
    <form action="" className="flex flex-col gap-3">
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        className="input-field"
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        className="input-field"
      />
      <button className="mb-7 mt-4 rounded-3xl bg-green-500 p-3 text-center font-semibold text-white shadow-md transition active:scale-95 dark:bg-green-600">
        Login
      </button>
    </form>
  );
};
