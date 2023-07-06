import styled from "styled-components";
import {
  compose,
  fontSize,
  fontWeight,
  color,
  textAlign,
  margin,
  FontSizeProps,
  FontWeightProps,
  ColorProps,
  TextAlignProps,
  MarginProps,
} from "styled-system";

export type TitleProps = FontSizeProps &
  FontWeightProps &
  ColorProps &
  TextAlignProps &
  MarginProps;

const Title = styled.h1<TitleProps>`
  margin: 10px 0;
  line-height: 1.15;
  font-size: 4rem;
  text-align: center;

  ${compose(fontSize, fontWeight, color, textAlign, margin)}
`;

export default Title;
