// app/components/primitives/row.tsx
import Link, { type LinkProps } from "next/link";
import type {
  AnchorHTMLAttributes,
  HTMLAttributes,
  ReactNode,
  JSX,
} from "react";

type Base = {
  className?: string;
  children: ReactNode;
};

// Link variant: render <Link>
export type RowLinkProps = Base & { href: LinkProps["href"] } & Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "href"
  >;

// Div variant: render <div>
export type RowDivProps = Base & {
  href?: undefined;
} & HTMLAttributes<HTMLDivElement>;

export type RowProps = RowLinkProps | RowDivProps;

// Overloads — tell TS exactly what we return for each input
export function Row(props: RowLinkProps): JSX.Element;
export function Row(props: RowDivProps): JSX.Element;

// Implementation
export function Row(props: RowProps): JSX.Element {
  if ("href" in props && props.href !== undefined) {
    // Narrow to the link variant explicitly
    const { href, className, children, ...anchorProps } = props as RowLinkProps;
    return (
      <Link href={href} className={className} {...anchorProps}>
        {children}
      </Link>
    );
  }

  // Narrow to the div variant explicitly
  const { className, children, ...divProps } = props as RowDivProps;
  return (
    <div className={className} {...divProps}>
      {children}
    </div>
  );
}
