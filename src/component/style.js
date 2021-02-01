import { css } from '@emotion/css';

export const logicController = css`
  width: 400px;
  padding: 12px;
`;
export const button = css`
  border: 1px solid #eee;
  border-radius: 2px;
  padding: 2px 8px;
  margin: 12px;
  cursor: pointer;
`;
export const piano = css`
  display: flex;
`;
const inlineFlex = css`
  display: inline-flex;
`;
export const flex = css`
  display: flex;
`;
const pianoKeys = css`
  width: 220px;
  height: 400px;
  text-align: center;
  line-height: 200px;
  font-size: 24px;
  color: #000;
  padding: 12px;
`;
export const getStyle = (paddingState, color) => {
  const def = css`
    ${pianoKeys};
    background: rgb(${color});
  `;
  const padding = css`
    ${def};
    background: #000;
    color: #fff;
  `;
  if (paddingState) {
    return padding;
  }
  return def;
};
const two = css`
  ${pianoKeys};
  background: rgb(255, 165, 0);
`;
const three = css`
  ${pianoKeys};
  background: rgb(255, 255, 0);
`;
const four = css`
  ${pianoKeys};
  background: rgb(0, 255, 0);
`;
const five = css`
  ${pianoKeys};
  background: rgb(0, 127, 255);
`;
const six = css`
  ${pianoKeys};
  background: rgb(0, 0, 255);
`;
const seven = css`
  ${pianoKeys};
  background: rgb(139, 0, 255);
`;
export const verticalNav = css`
  list-style: none;
  padding: 12px;
  & li {
    border-bottom: 1px solid #ddd;
  }
  & li:hover{
    background: #eee;
  }
`;
export const header = css`
  margin: 0;
  height: 24px;
  line-height: 24px;
  padding: 0 12px;
  background: rgba(0, 0, 0, 1);
  color: #fff;
`;
