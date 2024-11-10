import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState, useEffect, useCallback } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { Settings } from "@/components/Settings"

function App() {
  const { theme, setTheme } = useTheme()

  const [timerDurations, setTimerDurations] = useState({
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
  })

  const [time, setTime] = useState(timerDurations.pomodoro * 60)
  const [isActive, setIsActive] = useState(false)
  const [activeTab, setActiveTab] = useState('pomodoro')
  const [completedPomodoros, setCompletedPomodoros] = useState(0)
  const [totalPomodoroTime, setTotalPomodoroTime] = useState(0)
  const [autoStartBreaks, setAutoStartBreaks] = useState(false)
  const [autoStartPomodoros, setAutoStartPomodoros] = useState(false)
  const [longBreakInterval, setLongBreakInterval] = useState(4)

  const handleTimerComplete = useCallback(() => {
    setIsActive(false)
    
    if (activeTab === 'pomodoro') {
      const newCompletedCount = completedPomodoros + 1
      setCompletedPomodoros(newCompletedCount)
      setTotalPomodoroTime(prev => prev + timerDurations.pomodoro * 60)
      
      if (newCompletedCount % longBreakInterval === 0) {
        setActiveTab('longBreak')
        setTime(timerDurations.longBreak * 60)
        if (autoStartBreaks) setIsActive(true)
        new Notification('Pomodoro Complete!', { 
          body: "Time for a long break!" 
        })
      } else {
        setActiveTab('shortBreak')
        setTime(timerDurations.shortBreak * 60)
        if (autoStartBreaks) setIsActive(true)
        new Notification('Pomodoro Complete!', { 
          body: "Time for a short break!" 
        })
      }
    } else {
      setActiveTab('pomodoro')
      setTime(timerDurations.pomodoro * 60)
      if (autoStartPomodoros) setIsActive(true)
      new Notification('Break Complete!', { 
        body: "Time to focus!" 
      })
    }
  }, [activeTab, completedPomodoros, timerDurations, longBreakInterval, autoStartBreaks, autoStartPomodoros])

  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission()
    }
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1)
      }, 1000)
    } else if (time === 0) {
      handleTimerComplete()
    }

    return () => clearInterval(interval)
  }, [isActive, time, activeTab, completedPomodoros, handleTimerComplete])

  useEffect(() => {
    const formattedTime = formatTime(time)
    const tabName = activeTab.charAt(0).toUpperCase() + activeTab.slice(1)
    document.title = `${formattedTime} | ${tabName}`

    return () => {
      document.title = 'Pomodoro Timer'
    }
  }, [time, activeTab])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getBgColor = () => {
    switch (activeTab) {
      case 'pomodoro':
        return 'bg-red-50 dark:bg-red-950'
      case 'shortBreak':
        return 'bg-green-50 dark:bg-green-950'
      case 'longBreak':
        return 'bg-blue-50 dark:bg-blue-950'
      default:
        return 'bg-background'
    }
  }

  const handleDurationChange = (key: string, value: number) => {
    setTimerDurations(prev => ({
      ...prev,
      [key]: value
    }))
    if (key === activeTab) {
      setTime(value * 60)
    }
  }

  const handleSettingChange = (key: string, value: boolean | number) => {
    switch (key) {
      case 'autoStartBreaks':
        setAutoStartBreaks(value as boolean)
        break
      case 'autoStartPomodoros':
        setAutoStartPomodoros(value as boolean)
        break
      case 'longBreakInterval':
        setLongBreakInterval(value as number)
        break
    }
  }

  return (
    <div className={`h-screen flex items-center justify-center transition-colors ${getBgColor()}`}>
      <div className="w-[400px] flex flex-col items-center space-y-8 p-8 rounded-xl border border-border shadow-lg bg-background/50 backdrop-blur-sm">
        <div className="flex justify-between w-full">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Settings 
            durations={timerDurations} 
            autoStartBreaks={autoStartBreaks}
            autoStartPomodoros={autoStartPomodoros}
            longBreakInterval={longBreakInterval}
            onDurationChange={handleDurationChange}
            onSettingChange={handleSettingChange}
          />
        </div>

        <Tabs 
          value={activeTab} 
          className="w-full"
          onValueChange={(value) => {
            setIsActive(false)
            setTime(timerDurations[value as keyof typeof timerDurations] * 60)
            setActiveTab(value)
          }}
        >
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="pomodoro">Pomodoro</TabsTrigger>
            <TabsTrigger value="shortBreak">Short Break</TabsTrigger>
            <TabsTrigger value="longBreak">Long Break</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="text-8xl font-bold">
          {formatTime(time)}
        </div>

        <Button 
          size="lg" 
          className="w-32 text-xl"
          onClick={() => setIsActive(!isActive)}
        >
          {isActive ? 'PAUSE' : 'START'}
        </Button>

        <div className="text-center text-sm text-muted-foreground">
          <p>Total Pomodoros: {completedPomodoros}</p>
          <p>Total Focus Time: {Math.floor(totalPomodoroTime / 60)} minutes</p>
        </div>
      </div>
    </div>
  )
}

export default App
