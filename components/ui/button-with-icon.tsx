import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../lib/utils";

export interface ButtonWithIconProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  asChild?: boolean;
  href?: string;
  className?: string;
}

/**
 * ButtonWithIcon - Expanding Pill Button with Sliding/Rotating Icon Cutout.
 *
 * Rest state: [ Label Text ]   ( O ) -> docked right
 * Hover state: ( O )   [ Label Text ] -> icon slides to left & rotates 45°, text slides to right
 *
 * Built with seamless ~500ms cubic-bezier transition, dark cutout icon circle (#121417)
 * against solid pill background (#F3F3F6 / #FFFFFF), and zero layout shift.
 */
export const ButtonWithIcon = React.forwardRef<
  HTMLAnchorElement,
  ButtonWithIconProps
>(
  (
    {
      className,
      children = "Get in touch",
      icon,
      asChild = false,
      href = "mailto:contact@digambarpatil.com",
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "a";

    return (
      <Comp
        ref={ref}
        href={href}
        className={cn(
          "group relative inline-flex items-center justify-between min-h-[44px] rounded-full bg-[#F3F3F6] text-[#121417] text-sm font-semibold pl-5 pr-1.5 py-1.5 no-underline transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-white hover:shadow-[0_6px_24px_rgba(196,181,253,0.38)] hover:pl-1.5 hover:pr-5 select-none cursor-pointer overflow-hidden border border-transparent hover:-translate-y-0.5",
          className
        )}
        {...props}
      >
        {/* Text Container - moves smoothly right on hover when layout shifts */}
        <span className="relative z-10 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:order-2">
          {children}
        </span>

        {/* Circular Inverted Cutout Icon Circle */}
        <span className="relative z-10 ml-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#121417] text-white shadow-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:ml-0 group-hover:mr-3 group-hover:order-1 group-hover:bg-[#121417] group-hover:scale-105">
          <span className="inline-flex transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45">
            {icon || <ArrowUpRight className="h-4 w-4 stroke-[2.2] text-[#F3F3F6]" />}
          </span>
        </span>
      </Comp>
    );
  }
);

ButtonWithIcon.displayName = "ButtonWithIcon";

export default ButtonWithIcon;
