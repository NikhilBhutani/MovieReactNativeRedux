import { useEffect, useState } from "react"

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
     const [data, setData] = useState<T | null>(null)
     const [loading, setLoading] = useState(false)
     const [error, setError] = useState<string | null>(null)


     const fetchData = async () => {
        try {
            setLoading(true)
            setError(null)
            const result = await fetchFunction()
            setData(result)
        } catch (err) {
            console.log(err instanceof Error ? err.message : 'An error occurred')
             setError(err instanceof Error ? err.message : new Error('An error occurred').message)
        } finally {
            setLoading(false)
        }
     }

     const reset = () => {
        setData(null)
        setError(null)
        setLoading(false)
     }

     useEffect(() => {
         if(autoFetch) {
            fetchData()
         }
     }, [])

     return { data, loading, error, fetchData: fetchData, reset }
}

export default useFetch;

