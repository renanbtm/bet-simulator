import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import { AppProvider } from '../data/context/AppContext'
import { TicketProvider } from '../data/context/TicketContext'
import { AuthProvider } from '../data/context/AuthContext'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    document.querySelector("#__next").className = "bg-gray-100 dark:bg-gray-700";
  }, []);

  return (
    <AppProvider>
      <AuthProvider>
        <TicketProvider>
          <Component {...pageProps} />
        </TicketProvider>
      </AuthProvider>
    </AppProvider>
  )
}

export default MyApp
