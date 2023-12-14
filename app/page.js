import Image from 'next/image'
import Header from './_components/Header'
import HomePage from './_components/HomePage'

export default function Home() {
  return (
<div style={{paddingLeft: 130, paddingRight: 130}}>
  <Header />
  <HomePage />
</div>
  )
}
