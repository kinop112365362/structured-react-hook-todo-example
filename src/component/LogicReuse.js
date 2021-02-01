import React from 'react'
import { useRouteNode } from 'react-router5'
import { useMembraneStore } from '../store/use-membrane-store'
import { Link, useRoute } from 'react-router5'
import {
  header,
  flex,
  piano,
  getStyle,
  logicController,
  button,
  verticalNav
} from './style'

function LogicContainer ({ id = 1 }) {
  const store = useMembraneStore(id)
  console.log(store)
  return (
    <div>
      <p className={header}>In production line : {id}</p>
      <div className={flex}>
        <div className={piano}>
          <div
            className={getStyle(store.state.stateOne.paddingState, '255, 0, 0')}
          >
            {store.state.stateOne.text}
          </div>
          <div
            className={getStyle(
              store.state.stateTwo.paddingState,
              '255, 165, 0'
            )}
          >
            {store.state.stateTwo.text}
          </div>
          <div
            className={getStyle(
              store.state.stateThree.paddingState,
              '255, 255, 0'
            )}
          >
            {store.state.stateThree.text}
          </div>
        </div>
        <div className={logicController}>
          <button
            onClick={store.controller.onResetButtonClick}
            className={button}
          >
            Reset
          </button>
          <button
            onClick={store.controller.onDefaultLogicButtonClick}
            className={button}
          >
            Start
          </button>
        </div>
      </div>
    </div>
  )
}

function LogicReuse () {
  const { route } = useRouteNode('logicReuse')
  return (
    <div className={flex}>
      <ul className={verticalNav}>
        <li>
          <Link routeName='logicReuse.productionLine' routeParams={{ id: 1 }}>
            <p>The production line 1</p>
            <p>
              <strong>(The serial execution)</strong>
            </p>
          </Link>
        </li>
        <li>
          <Link routeName='logicReuse.productionLine' routeParams={{ id: 2 }}>
            <p>The production line 2</p>
            <p>
              <strong>(Execute logic at different times in parallel)</strong>
            </p>
          </Link>
        </li>
        <li>
          <Link routeName='logicReuse.productionLine' routeParams={{ id: 3 }}>
            <p>The production line 3</p>
            <p>
              <strong>(The parallel execution)</strong>
            </p>
          </Link>
        </li>
        <li>
          <Link routeName='logicReuse.productionLine' routeParams={{ id: 4 }}>
            <p>The production line 4</p>
            <p>
              <strong>(Insert logic at the beginning and end)</strong>
            </p>
          </Link>
        </li>
        <li>
          <Link routeName='logicReuse.productionLine' routeParams={{ id: 5 }}>
            <p>The production line 5</p>
            <p>
              <strong>(Inserts logic during execution)</strong>
            </p>
          </Link>
        </li>
      </ul>
      <LogicContainer id={route.params.id}></LogicContainer>
    </div>
  )
}
export default LogicReuse
