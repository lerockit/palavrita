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
        <nav className="flex gap-4">
          <button
            aria-label="Pagina Ajuda"
            onClick={() => setCurrentRoute('HELP')}
            data-testid="help-page-button"
          >
            <IconBox iconElement={QuestionMarkIcon} />
          </button>
          <a
            href={LINKS.GITHUB_PALAVRITA}
            target="_blank"
            rel="noreferrer"
            aria-label="Palavrita Github"
          >
            <IconBox iconElement={GithubIcon} />
          </a>
        </nav>
        <div className="w-40">
          <button
            aria-label="Pagina Inicial"
            onClick={() => setCurrentRoute('HOME')}
            data-testid="logo"
          >
            <Logo />
          </button>
        </div>
        <nav className="flex gap-4">
          <button
            aria-label="Pagina Estatisticas"
            onClick={() => setCurrentRoute('STATISTICS')}
            data-testid="statistics-page-button"
          >
            <IconBox iconElement={StatsIcon} />
          </button>
          <button
            aria-label="Pagina Sobre"
            onClick={() => setCurrentRoute('ABOUT')}
            data-testid="about-page-button"
          >
            <IconBox iconElement={AboutIcon} />
          </button>
        </nav>
      </header>
    </>
  )
}

export default Header
