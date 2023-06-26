import React from 'react'
import Footer from '../../components/footer'
import Guess from '../../components/guess'
import Title from '../../components/title'
import {
  Guess as GuessType,
  LetterStatus,
} from '../../contexts/global/interface'

const Help: React.FC = () => {
  const fakeWord = 'BICHO'
  const fakeGuesses: Record<LetterStatus, GuessType> = {
    DISPLACED: {
      letters: [
        { id: 'B', status: 'INCORRECT' },
        { id: 'I', status: 'DISPLACED' },
        { id: 'C', status: 'INCORRECT' },
        { id: 'H', status: 'INCORRECT' },
        { id: 'O', status: 'INCORRECT' },
      ],
      word: fakeWord,
    },
    CORRECT: {
      letters: [
        { id: 'B', status: 'INCORRECT' },
        { id: 'I', status: 'INCORRECT' },
        { id: 'C', status: 'CORRECT' },
        { id: 'H', status: 'INCORRECT' },
        { id: 'O', status: 'INCORRECT' },
      ],
      word: fakeWord,
    },
    INCORRECT: {
      letters: [
        { id: 'B', status: 'INCORRECT' },
        { id: 'I', status: 'INCORRECT' },
        { id: 'C', status: 'INCORRECT' },
        { id: 'H', status: 'INCORRECT' },
        { id: 'O', status: 'INCORRECT' },
      ],
      word: fakeWord,
    },
  }

  return (
    <div className="w-full px-8">
      <Title>Como jogar?</Title>
      <ul className="flex flex-col gap-4 w-full max-w pt-8 list-disc drop-shadow font-light text-base tracking-wide pb-4">
        <li>
          O jogo consiste em você acertar uma palavra (por dia) de{' '}
          <span className="font-medium">5 letras</span> com no máximo{' '}
          <span className="font-medium">6 tentativas.</span>
        </li>
        <li>
          Os palpites devem ser palavras{' '}
          <span className="font-medium">existentes</span> e todos os acentos e
          cedilhas serão <span className="font-medium">desconsiderados.</span>
        </li>
        <li className="pb-6">
          Se a letra for destacada da cor{' '}
          <span className="font-medium text-amber-300">amarela</span> ela está
          na palavra mas na{' '}
          <span className="font-medium text-amber-300">posição errada</span>:
          <div className="pt-6">
            <Guess guess={fakeGuesses.DISPLACED} />
          </div>
        </li>
        <li className="pb-6">
          Se a letra for destacada da cor{' '}
          <span className="font-medium text-emerald-300">verde</span> ela está
          na palavra e na{' '}
          <span className="font-medium text-emerald-300">posição certa</span>:
          <div className="pt-6">
            <Guess guess={fakeGuesses.CORRECT} />
          </div>
        </li>
        <li className="pb-6">
          Se a letra <span className="font-medium">não for destacada</span> ela{' '}
          <span className="font-medium">não está</span> presenta na palavra:
          <div className="pt-6">
            <Guess guess={fakeGuesses.INCORRECT} />
          </div>
        </li>
      </ul>
      <Footer />
    </div>
  )
}

export default Help
