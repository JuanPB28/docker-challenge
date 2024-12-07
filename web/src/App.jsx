import { useState } from 'react'
import StorageTypeMenu from './components/StorageTypeMenu'
import ActionButtons from './components/ActionButtons'
import { Card } from './components/ui/card'
import { Input } from './components/ui/input'
import { Textarea } from './components/ui/textarea'

export default function App() {
  const [storageType, setStorageType] = useState('class')
  const [directoryName, setDirectoryName] = useState('')
  const [content, setContent] = useState('')
  const [response, setResponse] = useState('')

  const handleApiCall = async (action) => {
    const apiUrl = 'http://127.0.0.1:8000/api' // Replace with your actual API URL
    let endpoint = ''
    let method = 'GET'
    let body = null

    switch (storageType) {
      case 'class':
        endpoint = '/hello'
        break
      case 'json':
        endpoint = '/json'
        break
      case 'csv':
        endpoint = '/csv'
        break
    }

    switch (action) {
      case 'index':
        method = 'GET'
        break
      case 'store':
        method = 'POST'
        body = JSON.stringify({ content })
        break
      case 'show':
        method = 'GET'
        endpoint += `/${directoryName}`
        break
      case 'update':
        method = 'PUT'
        endpoint += `/${directoryName}`
        body = JSON.stringify({ content })
        break
      case 'destroy':
        method = 'DELETE'
        endpoint += `/${directoryName}`
        break
    }
    
    try {
      const res = await fetch(`${apiUrl}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      })
      const data = await res.json()
      setResponse(JSON.stringify(data, null, 2))
    } catch (error) {
      setResponse(JSON.stringify({ error: 'An error occurred' }, null, 2))
    }
  }

  return (
    <div className="container mx-auto p-4 h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-4">REST API Consumer</h1>
      <div className="flex-grow grid grid-cols-3 gap-4">
        <div>
          <StorageTypeMenu 
            selectedType={storageType} 
            onSelectType={setStorageType} 
          />
        </div>
        <div className="space-y-4">
          <Input
            placeholder="File"
            value={directoryName}
            onChange={(e) => setDirectoryName(e.target.value)}
          />
          <Textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
          />
        </div>
        <div>
          <Card className="p-4 h-full overflow-auto">
            <pre className="whitespace-pre-wrap">{response || 'Response'}</pre>
          </Card>
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        <ActionButtons onAction={handleApiCall} />
      </div>
    </div>
  )
}

