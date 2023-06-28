import React from "react";
import styled, { css } from "styled-components";
import {
  compose,
  gridGap,
  grid,
  space,
  layout,
  flexbox,
  borders,
  GridGapProps,
  GridProps as StyledGridProps,
  SpaceProps,
  LayoutProps,
  FlexboxProps,
  BordersProps,
} from "styled-system";

export type GridProps = GridGapProps &
  StyledGridProps &
  SpaceProps &
  LayoutProps &
  FlexboxProps &
  BordersProps;

const Grid = styled.div<GridProps>`
  display: grid;
  align-items: center;
  justify-content: flex-end;

  grid-template-columns: ${({ children }) =>
    children && css`repeat(${React.Children.toArray(children).length}, auto);`};
  ${compose(gridGap, grid, space, layout, flexbox, borders)}
`;

Grid.defaultProps = {};

export default Grid;
