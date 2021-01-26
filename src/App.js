import React from 'react'
import { Link, useRoute } from 'react-router5'
import Main from './component/Main'
import NavLink from './component/NavLink'
import { css } from '@emotion/css'
import styled from '@emotion/styled'

const navStyle = css`
  display: flex;
  border-bottom: 1px solid #336699;
`
const NavHeader = styled.div`
  color: #333666;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 12px;
`

function App () {
  const route = useRoute()
  return (
    <div className='App'>
      <nav className={navStyle}>
        <NavHeader>ExampleLink → </NavHeader>
        <NavLink>
          <Link router={route} routeName='todo' routeOptions={{ reload: true }}>
            Todo
          </Link>
        </NavLink>
        <NavLink>
          <Link router={route} routeName='logicReuse'>
            Membrane
          </Link>
        </NavLink>
      </nav>
      <main>
        <Main></Main>
      </main>
    </div>
  )
}

export default App
