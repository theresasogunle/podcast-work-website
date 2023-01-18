import NextLink from "next/link";
import tw, { styled } from "twin.macro";

interface Props {
  id?: string;
  href?: string;
  isActive?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
}

const StyledLink = styled.a<{ $active?: boolean }>`
  ${tw`inline-block`}
  transition: color 200ms ease;

  ${({ $active }) => $active && tw`text-red!`}
`;

export const Link: React.FC<Props> = ({
  href,
  isActive,
  onMouseEnter,
  onMouseLeave,
  children,
  id,
  onClick,
  ...rest
}) => {
  if (!href) return null;
  const isInternalLink =
    !href?.startsWith("http") && !href?.startsWith("mailto:") && !href?.startsWith("tel:") && !href?.endsWith(".pdf");

  if (isInternalLink) {
    return (
      <NextLink href={href} passHref>
        <StyledLink
          id={id}
          $active={isActive}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={onClick}
          {...rest}
        >
          {children}
        </StyledLink>
      </NextLink>
    );
  }

  return (
    <StyledLink
      id={id}
      onClick={onClick}
      href={href}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      target="_blank"
      rel="noopener noreferrer"
      {...rest}
    >
      {children}
    </StyledLink>
  );
};
