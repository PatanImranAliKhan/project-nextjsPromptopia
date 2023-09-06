"use client"

import React from 'react'
import { SessionProvider } from 'next-auth/react'

function Provider({children, session}) {
  return (
    <SessionProvider session={session}
    // Re-fetch session every 5 minutes
    refetchInterval={5 * 60}
    // Re-fetches session when window is focused
    refetchOnWindowFocus={true}
    >
      {children}
    </SessionProvider>
  )
}

export default Provider