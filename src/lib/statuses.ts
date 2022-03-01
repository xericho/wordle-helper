import { unicodeSplit } from './words'

export type CharStatus = 'absent' | 'present' | 'correct'

export const getStatuses = (
  guesses: string[]
): { [key: string]: CharStatus } => {
  const charObj: { [key: string]: CharStatus } = {}

  // guesses.forEach((word) => {
  //   unicodeSplit(word).forEach((letter, i) => {
  //     if (!splitSolution.includes(letter)) {
  //       // make status absent
  //       return (charObj[letter] = 'absent')
  //     }

  //     if (letter === splitSolution[i]) {
  //       //make status correct
  //       return (charObj[letter] = 'correct')
  //     }

  //     if (charObj[letter] !== 'correct') {
  //       //make status present
  //       return (charObj[letter] = 'present')
  //     }
  //   })
  // })

  return charObj
}

export const getGuessStatuses = (guess: string): CharStatus[] => {
  const splitGuess = unicodeSplit(guess)

  const statuses: CharStatus[] = Array.from(Array(guess.length))


  return statuses
}
