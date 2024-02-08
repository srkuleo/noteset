import { manrope } from "@/styles/fonts";

export const HeroSubtitle = ({ content }: { content: string }) => {
  return (
    <h2
      className={`${manrope.className} pb-16 text-center font-semibold leading-snug dark:text-slate-400 md:text-balance`}
    >
      {content}
    </h2>
  );
};
