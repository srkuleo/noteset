export const RegisterForm = () => {
  return (
    <form action="" className="flex flex-col gap-2">
      <input
        type="text"
        name="username"
        id="username"
        placeholder="Username"
        className="input-field"
      />
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
      <input
        type="password"
        name="c-password"
        id="c-passowrd"
        placeholder="Confirm password"
        className="input-field"
      />
      <button
        type="submit"
        className="my-4 rounded-3xl bg-green-500 p-3 text-center font-semibold text-slate-50 shadow-md transition active:scale-95 dark:bg-green-700 dark:ring-2 dark:ring-inset dark:ring-green-500"
      >
        Register
      </button>
    </form>
  );
};
