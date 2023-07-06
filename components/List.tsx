import styled from "styled-components";
import {
  compose,
  grid,
  layout,
  padding,
  margin,
  GridProps,
  LayoutProps,
  PaddingProps,
  MarginProps,
} from "styled-system";

export type ListProps = GridProps & LayoutProps & PaddingProps & MarginProps;

const List = styled.ul<ListProps>`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
  grid-gap: 0.75rem;

  ${compose(grid, layout, padding, margin)}
`;

export default List;
