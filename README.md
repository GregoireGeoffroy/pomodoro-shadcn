# Pomodoro Timer

A modern, feature-rich Pomodoro Timer built with React and TypeScript. This application helps you manage your work sessions using the Pomodoro Technique, with customizable timers and breaks.

## Features

- **Customizable Timers**
  - Pomodoro duration (work session)
  - Short break duration
  - Long break duration
  - Configurable long break intervals

- **Smart Break System**
  - Automatic switch between work sessions and breaks
  - Long breaks after configured number of completed pomodoros
  - Short breaks between work sessions

- **Automation Options**
  - Auto-start breaks
  - Auto-start pomodoros
  - Desktop notifications when timers complete

- **User Experience**
  - Clean, minimal interface
  - Dark/Light theme support
  - Visual feedback with color-coded backgrounds
    - Red for work sessions
    - Green for short breaks
    - Blue for long breaks
  - Real-time browser tab timer display
  - Session statistics tracking
    - Total completed pomodoros
    - Total focus time

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Shadcn/ui Components
- Lucide Icons
- Vite

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## Usage

1. Choose your timer type:
   - Pomodoro (default work session)
   - Short Break
   - Long Break

2. Customize your settings:
   - Click the settings icon to adjust timer durations
   - Configure auto-start preferences
   - Set your preferred long break interval

3. Click START to begin your session
   - Timer will count down
   - Notifications will alert you when sessions end
   - Progress is tracked automatically

## Project Structure

```
src/
├── components/
│   ├── Settings.tsx      # Timer configuration dialog
│   └── ui/               # Reusable UI components
├── App.tsx              # Main application logic
└── index.css           # Global styles
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.