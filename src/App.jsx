import { useEffect } from 'react'
import './App.css'
import supabase from './helper/superBaseClient'
import CsvReader from './components/CsvReader'

function App() {
  // useEffect(() => {
  //   const fetchDataBase = async () => {
  //     const {data, error} = await supabase.from("donator_legacy").select()
  //     if (error) console.error
  //     if (!error) console.log(data)
  //   }
  //   fetchDataBase();
  // }, [])
  return (
    <>
      <CsvReader/>
    </>
  )
}

export default App
