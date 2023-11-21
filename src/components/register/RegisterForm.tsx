export const RegisterForm = () => {
  return (
    <form action="" className="flex flex-col gap-3">
      <input
        type="text"
        name="username"
        id="username"
        placeholder="Username"
        className="input-field"
      />
      <input
        type="email"
        name="create-email"
        id="create-email"
        placeholder="Email"
        className="input-field"
      />
      <input
        type="password"
        name="create-password"
        id="create-password"
        placeholder="Password"
        className="input-field"
      />
      <input
        type="password"
        name="confirm-password"
        id="confirm-passowrd"
        placeholder="Confirm password"
        className="input-field"
      />
      <button className="my-4 rounded-3xl bg-green-500 p-3 text-center font-semibold text-slate-50 shadow-md transition active:scale-95 dark:bg-green-700 dark:shadow-slate-950">
        Register
      </button>
    </form>
  );
};
