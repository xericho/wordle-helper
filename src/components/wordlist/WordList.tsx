import { useState, useEffect } from 'react'
import { WordBox } from './WordBox'
import { ThreeDots } from 'react-loader-spinner'

type Props = {
  wordList: any[]
  isLoading: boolean
}

export const WordList = ({ wordList, isLoading }: Props) => {
  return (
    <div className="flex flex-wrap w-full justify-center mb-1 mt-4">
      {isLoading 
      ? <ThreeDots width="3rem" color={'rgb(71 85 105)'} />
      : wordList[0] === 'error' 
        ? <div className="justify-center rounded mx-0.5 text-xs select-none dark:text-white">
            No more words!
          </div>
        : wordList.length > 0 
          ? wordList.map((word, i) => (
            <WordBox
              key={i}
              word={word}
            />
          )) 
          : <div className="justify-center rounded mx-0.5 text-xs select-none dark:text-white">
              Please enter a word.
            </div>
      }
    </div>
  )
}