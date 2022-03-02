import { useState, useEffect } from 'react'
import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { InfoModal } from './components/modals/InfoModal'
import { WordListModal } from './components/modals/WordListModal'
import { SettingsModal } from './components/modals/SettingsModal'
import {
  GAME_TITLE,
  WIN_MESSAGES,
  GAME_COPIED_MESSAGE,
  NOT_ENOUGH_LETTERS_MESSAGE,
  WORD_NOT_FOUND_MESSAGE,
  CORRECT_WORD_MESSAGE,
  HARD_MODE_ALERT_MESSAGE,
} from './constants/strings'
import {
  MAX_WORD_LENGTH,
  MAX_CHALLENGES,
  REVEAL_TIME_MS,
  GAME_LOST_INFO_DELAY,
  WELCOME_INFO_MODAL_MS,
} from './constants/settings'
import {
  isWordInWordList,
  unicodeLength,
} from './lib/words'
import {
  setStoredIsHighContrastMode,
  getStoredIsHighContrastMode,
} from './lib/localStorage'
import { default as GraphemeSplitter } from 'grapheme-splitter'

import './App.css'
import { Navbar } from './components/navbar/Navbar'
import { WordList } from './components/wordlist/WordList'
import { AlertContainer } from './components/alerts/AlertContainer'
import { useAlert } from './context/AlertContext'

function App() {
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches

  const { showError: showErrorAlert, showSuccess: showSuccessAlert } =
    useAlert()
  const [currentGuess, setCurrentGuess] = useState('')
  const [currentStatuses, setCurrentStatuses] = useState<string[]>([])
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
  const [isWordListModalOpen, setIsWordListModalOpen] = useState(false)
  const [currentRowClass, setCurrentRowClass] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme')
      ? localStorage.getItem('theme') === 'dark'
      : prefersDarkMode
      ? true
      : false
  )
  const [isHighContrastMode, setIsHighContrastMode] = useState(
    getStoredIsHighContrastMode()
  )
  const [guesses, setGuesses] = useState<string[]>([])
  const [statuses, setStatuses] = useState<string[][]>([])
  const [wordList, setWordList] = useState<any[]>([]);


  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    if (isHighContrastMode) {
      document.documentElement.classList.add('high-contrast')
    } else {
      document.documentElement.classList.remove('high-contrast')
    }
  }, [isDarkMode, isHighContrastMode])

  const handleDarkMode = (isDark: boolean) => {
    setIsDarkMode(isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }

  const handleHighContrastMode = (isHighContrast: boolean) => {
    setIsHighContrastMode(isHighContrast)
    setStoredIsHighContrastMode(isHighContrast)
  }

  const clearCurrentRowClass = () => {
    setCurrentRowClass('')
  }

  const onChar = (value: string) => {
    if (
      unicodeLength(`${currentGuess}${value}`) <= MAX_WORD_LENGTH &&
      guesses.length < MAX_CHALLENGES 
    ) {
      setCurrentGuess(`${currentGuess}${value}`)
      setCurrentStatuses([...currentStatuses, 'absent'])
    }
  }

  const onDelete = () => {
    setCurrentGuess(
      new GraphemeSplitter().splitGraphemes(currentGuess).slice(0, -1).join('')
    )
    setCurrentStatuses(currentStatuses.slice(0, -1))
  }

  const onEnter = () => {

    if (!(unicodeLength(currentGuess) === MAX_WORD_LENGTH)) {
      setCurrentRowClass('jiggle')
      return showErrorAlert(NOT_ENOUGH_LETTERS_MESSAGE, {
        onClose: clearCurrentRowClass,
      })
    }

    if (!isWordInWordList(currentGuess)) {
      setCurrentRowClass('jiggle')
      return showErrorAlert(WORD_NOT_FOUND_MESSAGE, {
        onClose: clearCurrentRowClass,
      })
    }

    if (
      unicodeLength(currentGuess) === MAX_WORD_LENGTH &&
      guesses.length < MAX_CHALLENGES 
    ) {
      // Store statuses and guesses
      setStatuses([...statuses, currentStatuses])
      setGuesses([...guesses, currentGuess])
      // Reset guess and statuses for new row
      setCurrentStatuses([])
      setCurrentGuess('')
      // Update word list
      let excludeLetters = new Set<string>()
      let includeLetters = new Set<string>()
      let guess = ['_', '_', '_', '_', '_']

      statuses.forEach((row, i) => {
        row.forEach((status, pos) => {
          if (status === 'absent') excludeLetters.add(guesses[i][pos])
          else if (status === 'present') includeLetters.add(guesses[i][pos])
          else if (status === 'correct') guess[pos] = guesses[i][pos]
        })
      })
      let url = `https://fly.wordfinderapi.com/api/search?&length=5&word_sorting=points&group_by_length=true&dictionary=wordle&contains=${guess.join('').toLowerCase()}&exclude_letters=${Array.from(excludeLetters.values()).join('').toLowerCase()}&include_letters=${Array.from(includeLetters.values()).join('').toLowerCase()}`
      fetch(url)
      .then(resp => resp.json())
      .then(data => setWordList(data.word_pages[0].word_list))
      setIsWordListModalOpen(true)

      if (guesses.length === MAX_CHALLENGES - 1) {
        showSuccessAlert("Thanks for trying out Herdle!", {
          persist: true,
          delayMs: REVEAL_TIME_MS * MAX_WORD_LENGTH + 1,
        })
      }
    }
  }

  return (
    <div className="h-screen flex flex-col">
      <Navbar
        setIsInfoModalOpen={setIsInfoModalOpen}
        setIsWordListModalOpen={setIsWordListModalOpen}
        setIsSettingsModalOpen={setIsSettingsModalOpen}
      />
      <div className="pt-2 px-1 pb-8 md:max-w-7xl w-full mx-auto sm:px-6 lg:px-8 flex flex-col grow">
        <div className="px-2 grow">
          <div className="pb-6 grow">
            <Grid
              guesses={guesses}
              statuses={statuses}
              currentGuess={currentGuess}
              currentStatuses={currentStatuses}
              currentRowClassName={currentRowClass}
              setCurrentStatuses={setCurrentStatuses}
              // isRevealing={isRevealing}
            />
          </div>
          <Keyboard
            onChar={onChar}
            onDelete={onDelete}
            onEnter={onEnter}
            guesses={guesses}
            statuses={statuses}
            // isRevealing={isRevealing}
          />
          <InfoModal
            isOpen={isInfoModalOpen}
            handleClose={() => setIsInfoModalOpen(false)}
          />
          <WordListModal
            isOpen={isWordListModalOpen}
            handleClose={() => setIsWordListModalOpen(false)}
            wordList={wordList}
          />
          <SettingsModal
            isOpen={isSettingsModalOpen}
            handleClose={() => setIsSettingsModalOpen(false)}
            isDarkMode={isDarkMode}
            handleDarkMode={handleDarkMode}
            isHighContrastMode={isHighContrastMode}
            handleHighContrastMode={handleHighContrastMode}
          />
          <AlertContainer />
        </div>
        {/* <div className="px-2 grow sm:invisible">
          <WordList
            guesses={guesses}
            statuses={statuses}
          />
        </div> */}
      </div>
    </div>
  )
}

export default App
