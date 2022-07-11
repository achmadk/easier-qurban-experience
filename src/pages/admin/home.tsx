import { useUser } from '@clerk/nextjs'

export default function AdminHome() {
  const { user } = useUser()
  return (
    <h1>{`Welcome ${user?.fullName ?? '-'}`}</h1>
  )
}