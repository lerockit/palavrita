import React from 'react'
import Guesses from '../../components/guesses'
import Keyboard from '../../components/keyboard'
import RouteContainer from '../../components/route-container'

const Home: React.FC = () => {
  return (
    <RouteContainer routeKey="HOME">
      <Guesses />
      <Keyboard />
    </RouteContainer>
  )
}

export default Home
