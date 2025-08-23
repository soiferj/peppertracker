'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { HeartIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/solid'
import { format } from 'date-fns'

interface MedRecord {
  date: string
  had_morning_meds: boolean
  had_evening_meds: boolean
}

export default function Home() {
  const { data: session, status } = useSession()
  const [medRecord, setMedRecord] = useState<MedRecord | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (session) {
      fetchMedRecord()
    }
  }, [session])

  const fetchMedRecord = async () => {
    try {
      const response = await fetch('/api/meds')
      if (!response.ok) throw new Error('Failed to fetch medication data')
      const data = await response.json()
      setMedRecord(data)
    } catch (err) {
      setError('Failed to load medication data')
      console.error(err)
    }
  }

  const giveMedication = async (medType: 'morning' | 'evening') => {
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch('/api/meds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ medType }),
      })

      if (!response.ok) throw new Error('Failed to update medication')
      
      const data = await response.json()
      setMedRecord(data)
    } catch (err) {
      setError('Failed to update medication')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center paw-pattern">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeartIcon className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">PepperTracker</h1>
              <p className="text-gray-600">Keep track of your dog's medications with love</p>
            </div>
            
            <button
              onClick={() => signIn('google')}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    )
  }

  const today = format(new Date(), 'EEEE, MMMM do, yyyy')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 paw-pattern">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">PepperTracker 🐕</h1>
              <p className="text-gray-600">{today}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-2">Welcome, {session.user?.name}</p>
              <button
                onClick={() => signOut()}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Medication Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Morning Medication */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                medRecord?.had_morning_meds 
                  ? 'bg-green-100' 
                  : 'bg-gradient-to-br from-yellow-400 to-orange-500'
              }`}>
                {medRecord?.had_morning_meds ? (
                  <CheckCircleIcon className="h-10 w-10 text-green-600" />
                ) : (
                  <ClockIcon className="h-10 w-10 text-white" />
                )}
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Morning Meds</h2>
              <p className="text-gray-600 mb-6">
                {medRecord?.had_morning_meds 
                  ? '✅ Given today!' 
                  : 'Not given yet'}
              </p>
              
              <button
                onClick={() => giveMedication('morning')}
                disabled={loading || medRecord?.had_morning_meds}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 ${
                  medRecord?.had_morning_meds
                    ? 'bg-green-100 text-green-800 cursor-not-allowed'
                    : 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600 shadow-lg'
                } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Updating...' : medRecord?.had_morning_meds ? 'Already Given' : 'Give Morning Meds'}
              </button>
            </div>
          </div>

          {/* Evening Medication */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                medRecord?.had_evening_meds 
                  ? 'bg-green-100' 
                  : 'bg-gradient-to-br from-purple-500 to-blue-600'
              }`}>
                {medRecord?.had_evening_meds ? (
                  <CheckCircleIcon className="h-10 w-10 text-green-600" />
                ) : (
                  <ClockIcon className="h-10 w-10 text-white" />
                )}
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Evening Meds</h2>
              <p className="text-gray-600 mb-6">
                {medRecord?.had_evening_meds 
                  ? '✅ Given today!' 
                  : 'Not given yet'}
              </p>
              
              <button
                onClick={() => giveMedication('evening')}
                disabled={loading || medRecord?.had_evening_meds}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 ${
                  medRecord?.had_evening_meds
                    ? 'bg-green-100 text-green-800 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-500 to-blue-600 text-white hover:from-purple-600 hover:to-blue-700 shadow-lg'
                } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Updating...' : medRecord?.had_evening_meds ? 'Already Given' : 'Give Evening Meds'}
              </button>
            </div>
          </div>
        </div>

        {/* Daily Summary */}
        <div className="max-w-md mx-auto mt-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Today's Progress</h3>
            <div className="flex justify-center space-x-4">
              <div className={`flex items-center space-x-2 ${medRecord?.had_morning_meds ? 'text-green-600' : 'text-gray-400'}`}>
                <CheckCircleIcon className="h-5 w-5" />
                <span className="text-sm">Morning</span>
              </div>
              <div className={`flex items-center space-x-2 ${medRecord?.had_evening_meds ? 'text-green-600' : 'text-gray-400'}`}>
                <CheckCircleIcon className="h-5 w-5" />
                <span className="text-sm">Evening</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${((medRecord?.had_morning_meds ? 1 : 0) + (medRecord?.had_evening_meds ? 1 : 0)) * 50}%` 
                  }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {((medRecord?.had_morning_meds ? 1 : 0) + (medRecord?.had_evening_meds ? 1 : 0))} of 2 medications given
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
