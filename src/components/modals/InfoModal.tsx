import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'
import { WordList } from '../wordlist/WordList'
import {
    SupportIcon,
  } from '@heroicons/react/outline'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="How to Use" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Herdle ("helps-with-Wordle") is a Wordle clone that helps you solve Wordle.
        Enter a word and a list of suggested words will appear!
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell
          value="T"
          status="absent"
        />
        <Cell
          value="A"
          status="absent"
        />
        <Cell
          value="S"
          status="absent"
        />
        <Cell
          value="T"
          status="absent"
        />
        <Cell
          value="Y"
          status="absent"
        />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        By default, all the letters will be gray. 
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell
          isRevealing={true}
          isCompleted={true}
          value="P"
          status="correct"
        />
        <Cell value="I" status="absent" />
        <Cell
          isRevealing={true}
          isCompleted={true}
          value="L"
          status="present"
        />
        <Cell value="O" status="absent" />
        <Cell value="T" status="absent" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Change the letter to the desired color.
      </p>

      <WordList
        wordList={[{'word': 'fuzzy'},{'word': 'comfy'},{'word': 'howdy'},{'word': 'dumpy'},]}
        isLoading={false}
      />
      <p className="text-sm text-gray-500 dark:text-gray-300">
        After entering, a list of words will appear.
      </p>

      <div className="flex mb-1 mt-4">
      <SupportIcon className="h-6 w-6 mr-3 cursor-pointer dark:stroke-white" />
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Click on this icon to view the word list again.
      </p></div>

      <p className="mt-6 italic text-sm text-gray-500 dark:text-gray-300">
        <a
          href="https://github.com/xericho/wordle-helper"
          className="underline font-bold"
          tabIndex={-1}
        >
          Check out the code here.
        </a>{' '}
      </p>
    </BaseModal>
  )
}
