import { useContext } from 'react'
import { LINKS } from '../../constants'
import { RouterContext } from '../../contexts/router'
import Button from '../button'
import HomeIcon from '../icons/home'

const Footer: React.FC = () => {
  const { setCurrentRoute } = useContext(RouterContext)

  return (
    <div className="pb-8 flex flex-col items-center gap-6">
      <Button
        onClick={() => setCurrentRoute('HOME')}
        icon={HomeIcon}
        text="Início"
      />
      <div className="flex flex-col gap-1 text-center">
        <span className="text-sm drop-shadow font-light">
          Este jogo foi desenvolvido por{' '}
          <a
            href={LINKS.INSTAGRAM}
            className="underline font-normal"
            target="_blank"
            rel="noreferrer"
          >
            @lerockit
          </a>
        </span>
        <span className="text-sm drop-shadow font-light">
          Veja novidades futuras do jogo{' '}
          <a
            href={LINKS.GITHUB_PALAVRITA_ROADMAP}
            className="underline font-normal"
            target="_blank"
            rel="noreferrer"
          >
            aqui
          </a>
        </span>
      </div>
    </div>
  )
}

export default Footer
