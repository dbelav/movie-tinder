import {useHttp} from './useHtpp'

interface ApiRespons<T>{
    results: T
}

const { request } = useHttp()

export async function UseGetMovieData<T>(url: string, loading: Function, getData: Function, error: Function) {
    loading()

    const response = await request(url) as ApiRespons<T>
    
    if ((await response).results) {
        getData(await response)
    } else {
        error()
    }
}

