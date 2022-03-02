import { WordList } from '../wordlist/WordList'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
  wordList: any[]
}

export const WordListModal = ({ isOpen, handleClose, wordList }: Props) => {
  return (
    <BaseModal title="Next Best Words" isOpen={isOpen} handleClose={handleClose}>
      <WordList
        wordList={wordList}
      />
    </BaseModal>
  )
}
