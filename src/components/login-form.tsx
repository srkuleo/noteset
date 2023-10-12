export const LoginForm = () => {
  return (
    <form action="" className="flex flex-col gap-2">
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        autoFocus
        required
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
      <div className="flex items-center gap-2 py-4">
        <input
          type="checkbox"
          id="remember-me"
          name="remember-me"
          className="h-5 w-5 accent-green-500 dark:accent-green-600"
        />
        <label
          htmlFor="remember-me"
          className="text-xs text-slate-600 dark:text-slate-300"
        >
          Stay logged in
        </label>
      </div>
      <button
        type="submit"
        className="mb-4 rounded-3xl bg-green-500 p-3 text-center font-semibold text-slate-50 shadow-md dark:bg-green-700 dark:ring-2 dark:ring-inset dark:ring-green-500"
      >
        Login
      </button>
    </form>
  );
};
