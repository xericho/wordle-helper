type Props = {
  word: any
}

export const WordBox = ({ word }: Props) => {
  return (
    <div className="badge bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded mb-2 dark:bg-gray-700 dark:text-gray-300">
        {word.word}
    </div>
  )
}