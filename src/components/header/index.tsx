import React from 'react'
import IconBox from '../icon-box'
import AboutIcon from '../icons/about'
import GithubIcon from '../icons/github'
import QuestionMarkIcon from '../icons/question-mark'
import StatsIcon from '../icons/stats'
import Logo from './logo'

const Header: React.FC = () => {
  return (
    <>
      <header className="container px-8 py-7 flex justify-between items-start">
        <div className="flex gap-4">
          <button>
            <IconBox iconElement={QuestionMarkIcon} />
          </button>
          <button>
            <IconBox iconElement={GithubIcon} />
          </button>
        </div>
        <div className="w-40">
          <Logo />
        </div>
        <div className="flex gap-4">
          <button>
            <IconBox iconElement={StatsIcon} />
          </button>
          <button>
            <IconBox iconElement={AboutIcon} />
          </button>
        </div>
      </header>
    </>
  )
}

export default Header
