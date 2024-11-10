import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Settings as SettingsIcon } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

interface SettingsProps {
  durations: {
    pomodoro: number;
    shortBreak: number;
    longBreak: number;
  };
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  longBreakInterval: number;
  onDurationChange: (key: string, value: number) => void;
  onSettingChange: (key: string, value: boolean | number) => void;
}

export function Settings({ 
  durations, 
  autoStartBreaks,
  autoStartPomodoros,
  longBreakInterval,
  onDurationChange,
  onSettingChange 
}: SettingsProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <SettingsIcon className="h-5 w-5" />
          <span className="sr-only">Open settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Timer Settings</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="pomodoro">Pomodoro Duration: {durations.pomodoro} minutes</Label>
            <Slider
              id="pomodoro"
              min={5}
              max={60}
              step={1}
              value={[durations.pomodoro]}
              onValueChange={(value) => onDurationChange('pomodoro', value[0])}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="shortBreak">Short Break Duration: {durations.shortBreak} minutes</Label>
            <Slider
              id="shortBreak"
              min={5}
              max={60}
              step={1}
              value={[durations.shortBreak]}
              onValueChange={(value) => onDurationChange('shortBreak', value[0])}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="longBreak">Long Break Duration: {durations.longBreak} minutes</Label>
            <Slider
              id="longBreak"
              min={5}
              max={60}
              step={1}
              value={[durations.longBreak]}
              onValueChange={(value) => onDurationChange('longBreak', value[0])}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="longBreakInterval">Long Break Interval: {longBreakInterval} pomodoros</Label>
            <Slider
              id="longBreakInterval"
              min={2}
              max={8}
              step={1}
              value={[longBreakInterval]}
              onValueChange={(value) => onSettingChange('longBreakInterval', value[0])}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="autoStartBreaks"
              checked={autoStartBreaks}
              onCheckedChange={(checked) => onSettingChange('autoStartBreaks', checked)}
            />
            <Label htmlFor="autoStartBreaks">Auto-start Breaks</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="autoStartPomodoros"
              checked={autoStartPomodoros}
              onCheckedChange={(checked) => onSettingChange('autoStartPomodoros', checked)}
            />
            <Label htmlFor="autoStartPomodoros">Auto-start Pomodoros</Label>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 