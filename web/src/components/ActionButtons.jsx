import { Button } from './ui/button'

export default function ActionButtons({ onAction }) {
  const actions = [
    { type: 'index', label: 'Get Files' },
    { type: 'store', label: 'Store' },
    { type: 'show', label: 'Show' },
    { type: 'update', label: 'Update' },
    { type: 'destroy', label: 'Delete' }
  ]

  return (
    <div className="flex gap-2">
      {actions.map(({ type, label }) => (
        <Button key={type} onClick={() => onAction(type)} size="sm">
          {label}
        </Button>
      ))}
    </div>
  )
}

