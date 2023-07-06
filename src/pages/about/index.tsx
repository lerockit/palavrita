import React from 'react'
import Footer from '../../components/footer'
import RouteContainer from '../../components/route-container'
import Title from '../../components/title'
import { LINKS } from '../../constants'

const About: React.FC = () => {
  const aboutPicutre = '/about_picture.png'

  return (
    <RouteContainer key="ABOUT">
      <div
        className="w-full px-8 flex flex-col items-center"
        data-testid="about-page"
      >
        <Title>Olá, Prazer</Title>
        <div className="py-8">
          <div className="bg-slate-50 p-1 rounded-sm w-36">
            <img src={aboutPicutre} className="w-full rounded-sm" />
          </div>
        </div>
        <div className="font-light drop-shadow flex flex-col gap-4 tracking-wide pb-8">
          <p>
            Me chamo{' '}
            <a
              className="underline font-normal"
              href={LINKS.INSTAGRAM}
              target="_blank"
              rel="noreferrer"
            >
              Leandro Morais
            </a>
            , sou desenvolvedor e criei o{' '}
            <span className="uppercase font-bold">
              Palavr<span className="text-pink-400">ita</span>
            </span>{' '}
            em 2023.
          </p>
          <p>
            O Palavrita é mais uma versão brasileira do jogo{' '}
            <a
              className="underline font-normal"
              href={LINKS.WORDLE}
              target="_blank"
              rel="noreferrer"
            >
              Wordle
            </a>
            .
          </p>
          <p>
            Enquanto desenvolvia coletei muitas ideias de outras versões
            brasileiras do jogo:
          </p>
          <ul className="flex flex-col gap-2 list-disc">
            <li>
              <a
                className="underline font-normal"
                href={LINKS.LETRECO}
                target="_blank"
                rel="noreferrer"
              >
                Letreco
              </a>{' '}
              - Gabriel Toschi
            </li>
            <li>
              <a
                className="underline font-normal"
                href={LINKS.TERMO}
                target="_blank"
                rel="noreferrer"
              >
                Termo
              </a>{' '}
              - Fernando Serboncini
            </li>
            <li>
              <a
                className="underline font-normal"
                href={LINKS.CHARADA}
                target="_blank"
                rel="noreferrer"
              >
                Charada
              </a>
            </li>
          </ul>
        </div>
        <Footer />
      </div>
    </RouteContainer>
  )
}

export default About
