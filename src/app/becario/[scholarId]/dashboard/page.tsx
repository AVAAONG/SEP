import React from 'react'
import { SUUID } from 'short-uuid'

const page = ({ params }: { params: { scholarId: SUUID } }) => {
  console.log(params.scholarId)
  return (
    <div>page</div>
  )
}

export default page