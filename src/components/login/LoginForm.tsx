export const LoginForm = () => {
  return (
    <form action="" className="flex flex-col gap-4">
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
      <button className="my-4 rounded-3xl bg-green-500 p-3 text-center font-semibold text-slate-50 shadow-md transition active:scale-95 dark:bg-green-700 dark:shadow-slate-950">
        Login
      </button>
    </form>
  );
};
