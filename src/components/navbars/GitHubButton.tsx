import { GitHubIcon } from "@/icons/navbars/github";

export const GitHubButton = () => {
  return (
    <a
      href="https://github.com/srkuleo/noteset"
      target="_blank"
      rel="noreferrer"
      className="select-none"
    >
      {GitHubIcon}
    </a>
  );
};
