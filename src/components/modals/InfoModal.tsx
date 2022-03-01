import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="How to Use" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Enter a word and click on each letter to change it's color. After 
        pressing enter, a list of suggested words will appear on the right.
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

      {/* <div className="flex justify-center mb-1 mt-4">
        <Cell value="V" />
        <Cell value="A" />
        <Cell value="G" />
        <Cell isRevealing={true} isCompleted={true} value="U" status="absent" />
        <Cell value="E" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The letter U is not in the word in any spot.
      </p> */}

      <p className="mt-6 italic text-sm text-gray-500 dark:text-gray-300">
        <a
          href="https://github.com/xericho/wordle-helper"
          className="underline font-bold"
        >
          Check out the code here
        </a>{' '}
      </p>
    </BaseModal>
  )
}
