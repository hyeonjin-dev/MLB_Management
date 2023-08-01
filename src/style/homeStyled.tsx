import styled, { css } from "styled-components";
import { FaCrown, FaStar } from 'react-icons/fa';

export const HomeContainer = styled.div`
  display: flex;
  max-width: 800px;
  margin: 0 auto;
  flex-direction: column;
  gap: 20px;
  padding: 20px 20px 90px 20px;
`

const svgStyles = css`
  font-size: 0.7rem;
`

interface SvgProps {
  bgColor: string
}

export const StyledFaCrown = styled(FaCrown)<SvgProps>`
  ${svgStyles}
  fill: ${props => props.bgColor};
  &.iconExp {
    margin: 0 10px 0 0;
  }
`

export const StyledFaStar = styled(FaStar)<SvgProps>`
  ${svgStyles}
  fill: ${props => props.bgColor};
  &.iconExp {
    margin: 0 10px 0 0;
  }
`

export const HomeListContainer = styled.div`
  border-radius: 30px;
  margin: 0 0 20px;
  background: ${props => props.theme.white2};
  overflow: hidden;
  box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);
  table {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    border-collapse: collapse;
  }
  thead {
    background: ${props => props.theme.pink};
  }
  thead, tbody, tr {
    width: 100%;
  }
  tr {
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid #fff;
  }
  th, td {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3px;
    width: 25%;
    padding: 8px 0;
    text-align: center;
    font-size: 0.85rem;
    cursor: pointer;
  }
  td:nth-child(4) {
    text-align: start;
    font-size: 0.7rem;
    letter-spacing: -0.01rem;
    color: ${props => props.theme.green};
  }
  .date {
    letter-spacing: -0.04rem;
  }
  .etc {
    color: ${props => props.theme.green};
  }
  .pendding {
    width: 100%;
  }
`

export const BanTopContainer = styled.div`
  display: flex;
  div {
    margin: 0 0 0 auto;
  }
`