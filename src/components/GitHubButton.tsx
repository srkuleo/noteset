import { GitHubIcon } from "./icons/github"

export const GitHubButton = () => {
  return (
    <a
      href="https://github.com/srkuleo/noteset"
      target="_blank"
      rel="noreferrer"
      className="rounded-full p-1.5 active:bg-slate-200 dark:text-slate-400 dark:active:bg-slate-700"
    >
      {GitHubIcon}
      <p className="sr-only">Visit project on GitHub</p>
    </a>
  )
}
