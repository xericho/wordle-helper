import { ReactNode } from 'react'

type Props = {
  guess: string
  statuses: string[]
}

export const WordList = ({
  guess,
  statuses
}: Props) => {

  return (
    <div className="flex justify-center mt-4">
        <p className="text-l ml-2.5 font-bold dark:text-white">Next Best Words</p>

    </div>
  )
}