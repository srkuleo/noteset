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
        className="input-field"
      />
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
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
      <input
        type="password"
        name="cpassword"
        id="cpassowrd"
        placeholder="Confirm password"
        required
        className="input-field"
      />
      <div className="mb-4"></div>
      <button
        type="submit"
        className="mb-4 rounded-3xl bg-green-500 p-3 text-center font-semibold text-slate-50 shadow-md dark:bg-green-700 dark:ring-2 dark:ring-inset dark:ring-green-500"
      >
        Register
      </button>
    </form>
  );
};
