import { useContext } from 'react'
import { GITHUB_PALAVRITA_LINK, INSTAGRAM_LINK } from '../../constants'
import { GlobalContext } from '../../contexts/global'
import IconBox from '../icon-box'
import ArrowLeft from '../icons/arrow-left'

const Footer: React.FC = () => {
  const { setCurrentPage } = useContext(GlobalContext)

  return (
    <div className="pb-8 flex flex-col items-center gap-6">
      <button
        className="drop-shadow rounded-sm px-4 py-2 border-2 border-slate-50 flex gap-4 font-medium items-center uppercase bg-purple-400"
        onClick={() => setCurrentPage('HOME')}
      >
        <IconBox iconElement={ArrowLeft} size="sm" />
        Voltar
      </button>
      <div className="flex flex-col gap-1 text-center">
        <span className="text-sm drop-shadow font-light">
          Este jogo foi desenvolvido por{' '}
          <a
            href={INSTAGRAM_LINK}
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
            href={GITHUB_PALAVRITA_LINK}
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
