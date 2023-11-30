import {useHttp} from './useHtpp'

interface ApiRespons<T>{
    results: T
}

const { request } = useHttp()

export async function UseGetMovieData<T>(url: string, loading: Function, getData: Function, error: Function) {
    loading()

    const response = await request(url) as ApiRespons<T>
    // console.log(getData)    

    if ((await response).results) {
        console.log(getData)    
        getData(await response)
    } else {
        error()
    }
}

