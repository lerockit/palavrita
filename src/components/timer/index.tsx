import React, { useEffect, useState } from 'react'

const TIME_REMAINING_INTERVAL = 1000

const Timer: React.FC = () => {
  const [hours, setHours] = useState<string>('')
  const [minutes, setMinutes] = useState<string>('')
  const [seconds, setSeconds] = useState<string>('')

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const today = new Date()
      const tomorrow = new Date()
      tomorrow.setDate(today.getDate() + 1)
      tomorrow.setHours(0, 0, 0, 0)

      const timeOffset = tomorrow.getTime() - today.getTime()

      const secondsOffset = Math.floor(timeOffset / 1000)
      const seconds = String(secondsOffset % 60).padStart(2, '0')

      const minutesOffset = Math.floor(secondsOffset / 60)
      const minutes = String(minutesOffset % 60).padStart(2, '0')

      const hoursOffset = Math.floor(minutesOffset / 60)
      const hours = String(hoursOffset % 60).padStart(2, '0')

      setHours(hours)
      setMinutes(minutes)
      setSeconds(seconds)
    }

    calculateTimeRemaining()

    const interval = setInterval(
      calculateTimeRemaining,
      TIME_REMAINING_INTERVAL
    )

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="flex flex-col gap text-center">
      {hours && minutes && seconds ? (
        <span className="font-medium text-3xl drop-shadow">
          {hours}:{minutes}:{seconds}
        </span>
      ) : (
        <> - </>
      )}
      <div className="font-light text-xs drop-shadow">
        para a próxima palavra
      </div>
    </div>
  )
}

export default Timer
