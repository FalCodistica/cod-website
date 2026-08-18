import { type AnchorHTMLAttributes, forwardRef } from "react";
import { type LinkProps, Link as RouterLink } from "react-router";

type AppLinkProps = Omit<LinkProps, "to"> & {
  href: string;
};

const EXTERNAL_PROTOCOL = /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i;

const AppLink = forwardRef<HTMLAnchorElement, AppLinkProps>(function AppLink(
  { href, children, ...props },
  ref,
) {
  if (EXTERNAL_PROTOCOL.test(href)) {
    const anchorProps = props as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a ref={ref} href={href} {...anchorProps}>
        {children}
      </a>
    );
  }

  return (
    <RouterLink ref={ref} to={href} {...props}>
      {children}
    </RouterLink>
  );
});

export default AppLink;
