import { redirect } from 'next/navigation'

/** Dashboard home removed from UI; send users to public listings. */
export default function DashboardPage() {
  redirect('/listings')
}
