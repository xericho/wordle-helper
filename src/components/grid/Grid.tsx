import { MAX_CHALLENGES } from '../../constants/settings'
import { CharStatus } from '../../lib/statuses'
import { CompletedRow } from './CompletedRow'
import { CurrentRow } from './CurrentRow'
import { EmptyRow } from './EmptyRow'

type Props = {
  guesses: string[]
  statuses: string[][]
  currentGuess: string
  currentStatuses: string[]
  currentRowClassName: string
  setCurrentStatuses: (statuses: string[]) => void
}

export const Grid = ({
  guesses,
  statuses,
  currentGuess,
  currentStatuses,
  currentRowClassName,
  setCurrentStatuses
}: Props) => {
  const empties =
    guesses.length < MAX_CHALLENGES - 1
      ? Array.from(Array(MAX_CHALLENGES - 1 - guesses.length))
      : []

  return (
    <div className="pb-6">
      {guesses.map((guess, i) => (
        <CompletedRow
          key={i}
          guess={guess}
          statuses={statuses[i]}
        />
      ))}
      {guesses.length < MAX_CHALLENGES && (
        <CurrentRow 
          guess={currentGuess} 
          className={currentRowClassName} 
          currentStatuses={currentStatuses} 
          setCurrentStatuses={setCurrentStatuses}
        />
      )}
      {empties.map((_, i) => (
        <EmptyRow key={i} />
      ))}
    </div>
  )
}
