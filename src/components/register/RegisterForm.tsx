export const RegisterForm = () => {
  return (
    <form action="" className="flex flex-col gap-2">
      <input
        type="text"
        name="username"
        id="username"
        placeholder="Username"
        required
        autoFocus
        autoComplete="username"
        className="input-field"
      />
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        required
        autoComplete="email"
        className="input-field"
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        required
        className="input-field"
      />
      <input
        type="password"
        name="c-password"
        id="c-passowrd"
        placeholder="Confirm password"
        autoComplete="new-password"
        required
        className="input-field"
      />
      <div className="mb-4"></div>
      <button
        type="submit"
        className="mb-4 rounded-3xl bg-green-500 p-3 text-center font-semibold text-slate-50 shadow-md transition active:scale-95 dark:bg-green-700 dark:ring-2 dark:ring-inset dark:ring-green-500"
      >
        Register
      </button>
    </form>
  );
};
