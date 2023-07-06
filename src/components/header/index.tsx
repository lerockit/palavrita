import React, { useContext } from 'react'
import { LINKS } from '../../constants'
import { RouterContext } from '../../contexts/router'
import IconBox from '../icon-box'
import AboutIcon from '../icons/about'
import GithubIcon from '../icons/github'
import QuestionMarkIcon from '../icons/question-mark'
import StatsIcon from '../icons/stats'
import Logo from '../logo'

const Header: React.FC = () => {
  const { setCurrentRoute } = useContext(RouterContext)

  return (
    <>
      <header className="container px-8 py-7 flex justify-between items-start max-w-md">
        <div className="flex gap-4">
          <button
            onClick={() => setCurrentRoute('HELP')}
            data-testid="help-page-button"
          >
            <IconBox iconElement={QuestionMarkIcon} />
          </button>
          <a href={LINKS.GITHUB_PALAVRITA} target="_blank" rel="noreferrer">
            <IconBox iconElement={GithubIcon} />
          </a>
        </div>
        <div className="w-40">
          <button onClick={() => setCurrentRoute('HOME')}>
            <Logo />
          </button>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setCurrentRoute('STATISTICS')}
            data-testid="statistics-page-button"
          >
            <IconBox iconElement={StatsIcon} />
          </button>
          <button
            onClick={() => setCurrentRoute('ABOUT')}
            data-testid="about-page-button"
          >
            <IconBox iconElement={AboutIcon} />
          </button>
        </div>
      </header>
    </>
  )
}

export default Header
