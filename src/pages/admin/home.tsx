import { useUser, useClerk } from '@clerk/nextjs'
import router from 'next/router'

export default function AdminHome() {
  const { user } = useUser()
  const { signOut } = useClerk()

  /**
   * @todo add toast after successfully logout
   */
  const handleLogoutClicked = () => signOut(() => router.replace('/'))

  return (
    <div className="container">
      <h1>{`Welcome ${user?.fullName ?? '-'}`}</h1>
      <button onClick={handleLogoutClicked}>Logout</button>
    </div>
  )
}