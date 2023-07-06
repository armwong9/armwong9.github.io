import styled from "styled-components";
import {
  compose,
  position,
  alignContent,
  justifyContent,
  justifyItems,
  grid,
  layout,
  flexDirection,
  padding,
  borders,
  margin,
  textAlign,
  alignItems,
  color,
  display,
  PositionProps,
  AlignContentProps,
  JustifyContentProps,
  JustifyItemsProps,
  GridProps,
  LayoutProps,
  FlexDirectionProps,
  PaddingProps,
  BordersProps,
  MarginProps,
  TextAlignProps,
  AlignItemsProps,
  ColorProps,
  DisplayProps,
} from "styled-system";

export type ContainerProps = PositionProps &
  AlignContentProps &
  JustifyContentProps &
  JustifyItemsProps &
  GridProps &
  LayoutProps &
  FlexDirectionProps &
  PaddingProps &
  BordersProps &
  MarginProps &
  TextAlignProps &
  AlignItemsProps &
  ColorProps &
  DisplayProps;

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  ${compose(
    position,
    alignContent,
    justifyContent,
    justifyItems,
    grid,
    layout,
    flexDirection,
    padding,
    borders,
    margin,
    textAlign,
    alignItems,
    color,
    display,
  )};
`;

export default Container;
