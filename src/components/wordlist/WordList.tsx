import { useState, useEffect } from 'react'
import { WordBox } from './WordBox'

type Props = {
  guesses: string[]
  statuses: string[][]
}

export const WordList = ({ guesses, statuses }: Props) => {
  const [wordList, setWordList] = useState<any[]>([]);
  let excludeLetters = new Set<string>()
  let includeLetters = new Set<string>()
  let guess = ['_', '_', '_', '_', '_']

  statuses.forEach((row, i) => {
    row.forEach((status, pos) => {
      if (status == 'absent') excludeLetters.add(guesses[i][pos])
      else if (status == 'present') includeLetters.add(guesses[i][pos])
      else if (status == 'correct') guess[pos] = guesses[i][pos]
    })
  })
  let url = `https://fly.wordfinderapi.com/api/search?&length=5&word_sorting=points&group_by_length=true&dictionary=wordle&contains=${guess.join('').toLowerCase()}&exclude_letters=${Array.from(excludeLetters.values()).join('').toLowerCase()}&include_letters=${Array.from(includeLetters.values()).join('').toLowerCase()}`
  useEffect(() => {
    // setLoading(true)
    fetch(url)
    .then(resp => resp.json())
    .then(data => setWordList(data.word_pages[0].word_list))
    // setLoading(false)
  }, [])
  console.log(wordList)

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