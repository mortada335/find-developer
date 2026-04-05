import { cn } from "@/lib/utils";

const Section = ({ className, children }) => {
  return (
    <section
      className={cn(
        "flex flex-col w-full justify-start py-4 px-4",
        className
      )}
    >
      {children}
    </section>
  );
};

export default Section;
