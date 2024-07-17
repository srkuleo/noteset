import { GitHubIcon } from "./icons/github";

export const GitHubButton = () => {
  return (
    <a
      href="https://github.com/srkuleo/noteset"
      target="_blank"
      rel="noreferrer"
      className="dark:text-slate-400"
    >
      {GitHubIcon}
      <p className="sr-only">Visit project on GitHub</p>
    </a>
  );
};
