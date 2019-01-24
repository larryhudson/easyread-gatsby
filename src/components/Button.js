import React from 'react'
import styled from 'styled-components'
import tachyons from 'styled-components-tachyons'

const Button = styled.button`
  ${tachyons}
`

export default ({children}) => <Button pa4 sans-serif>{children}</Button> 