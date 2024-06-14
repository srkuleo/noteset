import { GitHubIcon } from "../icons/landing/github";

export const GitHubButton = () => {
  return (
    <a
      href="https://github.com/srkuleo/noteset"
      target="_blank"
      rel="noreferrer"
    >
      {GitHubIcon}
      <p className="sr-only">Visit project on GitHub</p>
    </a>
  );
};
