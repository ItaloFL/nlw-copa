import { createContext, ReactNode, useState, useEffect } from 'react'
import * as Google from 'expo-auth-session/providers/google'
import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'

WebBrowser.maybeCompleteAuthSession()

interface UserProps {
  name: string
  avatarUrl: string
}

export interface AuthContextDataProps {
  user: UserProps
  isUserLoading: boolean
  signIn: () => Promise<void>
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps)
  const [isUserLoading, setIsUserLoaging] = useState(false)
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      '793840843132-lk5nu940b2fn7cv7grfdip8q2pb9e96v.apps.googleusercontent.com',
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ['profile', 'email']
  })

  async function signIn() {
    try {
      setIsUserLoaging(true)
      await promptAsync()
    } catch (error) {
      console.log(error)
      throw error
    } finally {
      setIsUserLoaging(false)
    }
  }

  async function signInWithGoogle(acessToken: string) {
    console.log(`Token de authenticação ${acessToken}`)
  }

  useEffect(() => {
    if (response?.type === 'success' && response.authentication?.accessToken) {
      signInWithGoogle(response.authentication.accessToken)
    }
  }, [response])

  return (
    <AuthContext.Provider
      value={{
        signIn,
        isUserLoading,
        user
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
