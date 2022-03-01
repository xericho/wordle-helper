import { unicodeSplit } from './words'

export type CharStatus = 'absent' | 'present' | 'correct'

export const getStatuses = (
  guesses: string[],
  statuses: string[][]
): { [key: string]: CharStatus | string} => {
  const charObj: { [key: string]: CharStatus | string} = {}

  guesses.forEach((word, gi) => {
    unicodeSplit(word).forEach((letter, i) => {
      return (charObj[letter] = statuses[gi][i])
    })
  })

  return charObj
}
