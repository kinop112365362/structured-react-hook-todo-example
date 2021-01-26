import React from 'react'
import {useRouteNode} from 'react-router5'

function LogicReuse(){
  const route = useRouteNode('logicReuse')
  return(
    <div>Logic Reuse</div>
  )
}
export default LogicReuse