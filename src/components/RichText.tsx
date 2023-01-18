import tw, { styled } from "twin.macro";
import { up } from "~/utils/screens";

interface Props {
  content: string;
}

const StyledRichText = styled.div`
  ${tw`max-w-full`}

  * + * {
    ${tw`mt-16`}
  }

  strong,
  b {
    ${tw`font-bold`}
  }

  a {
    ${tw`relative`}
    &::after {
      ${tw`block pointer-events-none absolute w-full`}
      content: "";
      background-color: currentColor;
      height: 1px;
      bottom: 0;
      transition: width 0.2s ease;
    }
    &:hover::after {
      ${tw`w-0`}
    }
  }

  ${up("md")} {
    font-size: 18px;
  }
`;

export const RichText: React.FC<Props> = ({ content, ...rest }) => {
  return <StyledRichText dangerouslySetInnerHTML={{ __html: content }} {...rest} />;
};
