import React from 'react'
import IconBox from '../icon-box'
import GithubIcon from '../icons/github'
import HamburgerMenuIcon from '../icons/hamburguer-menu'
import QuestionMarkIcon from '../icons/question-mark'
import StatsIcon from '../icons/stats'
import Logo from './logo'

const Header: React.FC = () => {
  return (
    <header className="container px-8 py-6 flex justify-between items-start">
      <div className="flex gap-2">
        <button className="border border-slate-50 rounded-sm p-1">
          <IconBox iconElement={QuestionMarkIcon} />
        </button>
        <button className="border border-slate-50 rounded-sm p-1">
          <IconBox iconElement={GithubIcon} />
        </button>
      </div>
      <div className="w-36">
        <Logo />
      </div>
      <div className="flex gap-2">
        <button className="border border-slate-50 rounded-sm p-1">
          <IconBox iconElement={StatsIcon} />
        </button>
        <button className="border border-slate-50 rounded-sm p-1">
          <IconBox iconElement={HamburgerMenuIcon} />
        </button>
      </div>
    </header>
  )
}

export default Header
