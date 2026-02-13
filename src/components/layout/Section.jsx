import { cn } from "@/lib/utils";

const Section = ({ className, children }) => {
  return (
    <section
      className={cn(
        " font-roboto flex flex-col w-full h-dvh min-h-full max-h-fit max-w-screen-2xl justify-start py-4",
        className
      )}
    >
      {children}
    </section>
  );
};

export default Section;
