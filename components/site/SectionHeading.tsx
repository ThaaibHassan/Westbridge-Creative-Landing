import Reveal from "@/components/motion/Reveal";
import WordReveal from "@/components/motion/WordReveal";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  label: string;
  title: string;
  className?: string;
  titleClassName?: string;
};

export default function SectionHeading({
  label,
  title,
  className,
  titleClassName,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Reveal>
        <div className="flex items-center gap-4">
          <span className="h-px w-8 bg-accent" />
          <span className="label">{label}</span>
        </div>
      </Reveal>
      <WordReveal
        as="h2"
        text={title}
        className={cn(
          "text-display max-w-3xl text-[clamp(2rem,5vw,3.75rem)]",
          titleClassName,
        )}
      />
    </div>
  );
}
