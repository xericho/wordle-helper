
type Props = {
  word: any
}

export const WordBox = ({ word }: Props) => {
  return (
    <div className="flex items-center justify-center rounded mx-0.5 text-xs select-none dark:text-white">
        {word.word}
    </div>
  )
}