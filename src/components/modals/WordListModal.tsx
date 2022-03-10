import { WordList } from '../wordlist/WordList'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
  wordList: any[]
  isLoading: boolean
}

export const WordListModal = ({ isOpen, handleClose, wordList, isLoading }: Props) => {
  return (
    <BaseModal title="Next Best Words" isOpen={isOpen} handleClose={handleClose}>
      <WordList
        wordList={wordList}
        isLoading={isLoading}
      />
    </BaseModal>
  )
}
