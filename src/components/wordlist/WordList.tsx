import { useState, useEffect } from 'react'
import { WordBox } from './WordBox'

type Props = {
  wordList: any[]
}

export const WordList = ({ wordList }: Props) => {
  return (
    <div className="flex flex-wrap w-full justify-center mb-1 mt-4">
      {wordList.map((word, i) => (
        <WordBox 
          key={i}
          word={word}
        />
      ))}
    </div>
  )
}