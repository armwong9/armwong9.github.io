import styled from "styled-components";
import {
  compose,
  textAlign,
  margin,
  fontSize,
  fontWeight,
  display,
  typography,
  layout,
  TextAlignProps,
  MarginProps,
  FontSizeProps,
  FontWeightProps,
  DisplayProps,
  TypographyProps,
  LayoutProps,
} from "styled-system";

export type TextProps = TextAlignProps &
  MarginProps &
  FontSizeProps &
  FontWeightProps &
  DisplayProps &
  TypographyProps &
  LayoutProps;

const Text = styled.p<TextProps>`
  font-size: 1.125rem;
  margin: 0.75rem 0;
  color: rgba(0, 0, 0, 0.7);
  white-space: pre-wrap;
  line-height: 160%;
  letter-spacing: 0.02em;

  ${compose(
    textAlign,
    margin,
    fontSize,
    fontWeight,
    display,
    typography,
    layout,
  )}
`;

export default Text;
