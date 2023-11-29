import { GitHubIcon } from "@/icons/auth/github";

export const GitHubButton = () => {
  return (
    <a
      href="https://github.com/srkuleo/noteset"
      target="_blank"
      rel="noreferrer"
    >
      <GitHubIcon className="h-7 w-7" />
    </a>
  );
};
