
import useSwr from 'swr'

const fetcher = (url:string) => fetch(url).then((res) => res.json())


function CallHello(){
    const { data, error, isLoading } = useSwr<any>('/api/hello', fetcher)

    if (error) return <div>Failed to load users</div>
    if (isLoading) return <div>Loading...</div>
    if (!data) return null

    return (
        <span>
            {data.name}
        </span>
    )
 }

 export default CallHello