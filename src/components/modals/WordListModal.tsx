import { Cell } from '../grid/Cell'
import { WordList } from '../wordlist/WordList'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
  guesses: string[]
  statuses: string[][]
}

export const WordListModal = ({ isOpen, handleClose, guesses, statuses }: Props) => {
  return (
    <BaseModal title="Next Best Words" isOpen={isOpen} handleClose={handleClose}>
      <WordList
        guesses={guesses}
        statuses={statuses}
      />
    </BaseModal>
  )
}
