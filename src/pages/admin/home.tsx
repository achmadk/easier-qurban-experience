import { useSession } from "next-auth/react"

export default function AdminHome() {
  const { data } = useSession()
  return (
    <h1>`Welcome ${data?.user?.name ?? '-'}`</h1>
  )
}