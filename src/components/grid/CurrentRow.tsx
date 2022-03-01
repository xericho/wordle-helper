import { MAX_WORD_LENGTH } from '../../constants/settings'
import { Cell } from './Cell'
import { unicodeSplit } from '../../lib/words'
import { CharStatus } from '../../lib/statuses'

type Props = {
  guess: string
  currentStatuses: string[]
  className: string
  setCurrentStatuses: (statuses: string[]) => void
}

export const CurrentRow = ({ 
  guess, 
  className, 
  currentStatuses, 
  setCurrentStatuses 
}: Props) => {
  const splitGuess = unicodeSplit(guess)
  const emptyCells = Array.from(Array(MAX_WORD_LENGTH - splitGuess.length))
  const classes = `flex justify-center mb-1 ${className}`

  const onClick = (status: string, index: number) => {
    currentStatuses[index] = status
    setCurrentStatuses(currentStatuses)
    console.log(status, index, currentStatuses)
  }

  return (
    <div className={classes}>
      {splitGuess.map((letter, i) => (
        <Cell key={i} value={letter} 
          status={'absent'} 
          onClick={onClick} 
          position={i}
        />
      ))}
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  )
}
