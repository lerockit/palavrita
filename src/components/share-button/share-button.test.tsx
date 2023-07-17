import * as rtd from 'react-device-detect'
import ShareButton from '.'
import {
  EMOGI_LETTER_STATUS_MAPPER,
  GUESSES_AMOUNT,
  LINKS,
} from '../../constants'
import { Guesses } from '../../contexts/global/interface'
import { mockNavigator, renderWithGlobalContext } from '../../test/utils'
import CopyToClipBoardNotification from '../notifications/copy-to-clipboard'

const notifyMock = jest.fn()
const getTodayInBRFormatMock = jest.fn()

jest.mock('../../hooks/useDate', () => {
  return () => ({
    getTodayInBRFormat: getTodayInBRFormatMock,
  })
})

jest.mock('../../hooks/useNotification', () => {
  return () => ({
    notify: notifyMock,
  })
})

const { shareMock, writeTextMock } = mockNavigator()

const fakeDate = '01/01/2023'
const fakeGuesses: Guesses = [
  {
    letters: [
      { id: 'A', status: 'CORRECT' },
      { id: 'A', status: 'DISPLACED' },
      { id: 'A', status: 'INCORRECT' },
      { id: 'A', status: null },
    ],
    word: 'AAAA',
  },
]
const fakeGuessesAsEmoji = `\n ${EMOGI_LETTER_STATUS_MAPPER['CORRECT']} ${EMOGI_LETTER_STATUS_MAPPER['DISPLACED']} ${EMOGI_LETTER_STATUS_MAPPER['INCORRECT']} ${EMOGI_LETTER_STATUS_MAPPER['NULL']}`
const fakeShareWonMessage = `Minha pontuação do Palavrita de hoje - 01/01/2023 (1/${GUESSES_AMOUNT}) \n@palavrita \n${fakeGuessesAsEmoji} \n \nJogue também em ${LINKS.PALAVRITA}`
const fakeShareNotWonMessage = `Minha pontuação do Palavrita de hoje - 01/01/2023 (X/${GUESSES_AMOUNT}) \n@palavrita \n${fakeGuessesAsEmoji} \n \nJogue também em ${LINKS.PALAVRITA}`

describe('<ShareButton />', () => {
  it('Should call notify and writeText from navigator when click if isMobile and gameFinishStatus is WON is false', () => {
    Object.assign(rtd, { isMobile: false })
    getTodayInBRFormatMock.mockReturnValue(fakeDate)
    const { getByRole } = renderWithGlobalContext(<ShareButton />, {
      previousGuesses: fakeGuesses,
      gameFinishStatus: 'WON',
    })

    const buttonElement = getByRole('button')
    buttonElement.click()

    expect(notifyMock).toHaveBeenCalledTimes(1)
    expect(notifyMock).toHaveBeenCalledWith(CopyToClipBoardNotification, {
      duration: 1500,
    })
    expect(writeTextMock).toHaveBeenCalledTimes(1)
    expect(writeTextMock).toHaveBeenCalledWith(fakeShareWonMessage)
  })

  it('Should call share from navigator when click if isMobile is true and gameFinishStatus is not WON is false', () => {
    Object.assign(rtd, { isMobile: true })
    getTodayInBRFormatMock.mockReturnValue(fakeDate)
    const { getByRole } = renderWithGlobalContext(<ShareButton />, {
      previousGuesses: fakeGuesses,
      gameFinishStatus: null,
    })

    const buttonElement = getByRole('button')
    buttonElement.click()

    expect(shareMock).toHaveBeenCalledTimes(1)
    expect(shareMock).toHaveBeenCalledWith({ text: fakeShareNotWonMessage })
  })
})
