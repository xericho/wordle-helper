import { CharStatus } from '../../lib/statuses'
import classnames from 'classnames'
import { REVEAL_TIME_MS } from '../../constants/settings'
import { getStoredIsHighContrastMode } from '../../lib/localStorage'

type Props = {
  value?: string
  status?: CharStatus | string
  isRevealing?: boolean
  isCompleted?: boolean
  position?: number
  onClick?: (status: CharStatus | string, index: number) => void
}

export const Cell = ({
  value,
  status,
  isRevealing,
  isCompleted,
  position = 0,
  onClick
}: Props) => {
  const isFilled = value && !isCompleted
  const shouldReveal = isRevealing && isCompleted
  const animationDelay = `${position * REVEAL_TIME_MS}ms`
  const isHighContrast = getStoredIsHighContrastMode()

  const classes = classnames(
    'w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-4xl font-bold rounded dark:text-white pointer',
    {
      'border-black dark:border-slate-100': value && !status,
      'absent shadowed bg-slate-400 dark:bg-slate-700 text-white border-slate-400 dark:border-slate-700':
        status === 'absent' || !status,
      'correct shadowed bg-orange-500 text-white border-orange-500':
        status === 'correct' && isHighContrast,
      'present shadowed bg-cyan-500 text-white border-cyan-500':
        status === 'present' && isHighContrast,
      'correct shadowed bg-green-500 text-white border-green-500':
        status === 'correct' && !isHighContrast,
      'present shadowed bg-yellow-500 text-white border-yellow-500':
        status === 'present' && !isHighContrast,
      'cell-fill-animation': isFilled,
      'cell-reveal': shouldReveal,
    }
  )

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    // Ignore if not current row
    if (isCompleted || !value) {return}

    // Cycle through statuses
    status = status === 'absent' ? 'correct' : (status === 'correct' ? 'present' : 'absent')

    const new_classes = classnames(
      'w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-4xl font-bold rounded dark:text-white pointer',
      {
        'border-black dark:border-slate-100': value && !status,
        'absent shadowed bg-slate-400 dark:bg-slate-700 text-white border-slate-400 dark:border-slate-700':
          status === 'absent' || !status,
        'correct shadowed bg-orange-500 text-white border-orange-500':
          status === 'correct' && isHighContrast,
        'present shadowed bg-cyan-500 text-white border-cyan-500':
          status === 'present' && isHighContrast,
        'correct shadowed bg-green-500 text-white border-green-500':
          status === 'correct' && !isHighContrast,
        'present shadowed bg-yellow-500 text-white border-yellow-500':
          status === 'present' && !isHighContrast,
      }
    )
    event.currentTarget.className = new_classes

    // Change corresponding currentStatuses
    if(onClick) onClick(status, position)
  }

  return (
    <div className={classes} style={{ animationDelay }} onClick={handleClick} tabIndex={-1} >
      <div className="letter-container" style={{ animationDelay }}>
        {value}
      </div>
    </div>
  )
}
