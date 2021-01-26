import React from 'react'
import { css } from '@emotion/css'

const style = css`
  a {
    display: inline-block;
    padding: 0.5rem 1rem;
    color: #336699;
  }
  a.active {
    background: #336699;
    color: #fff;
  }
`

function NavLink (props) {
  return <div className={style}>{props.children}</div>
}

export default NavLink
