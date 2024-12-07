import { Button } from './ui/button'

export default function StorageTypeMenu({ selectedType, onSelectType }) {
  const types = [
    { value: 'class', label: 'Class Storage' },
    { value: 'json', label: 'JSON' },
    { value: 'csv', label: 'CSV' }
  ]

  return (
    <div className="flex flex-col space-y-2">
      {types.map(({ value, label }) => (
        <Button
          key={value}
          variant={selectedType === value ? 'default' : 'outline'}
          onClick={() => onSelectType(value)}
          className="w-full justify-start"
        >
          {label}
        </Button>
      ))}
    </div>
  )
}

