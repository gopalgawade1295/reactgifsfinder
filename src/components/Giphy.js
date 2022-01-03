import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Giphy() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [itemsperpage, setItemsperpage] = useState(10)
    const indexOfLastItem = page * itemsperpage
    const indexOfFirstItem = indexOfLastItem - itemsperpage
    const totalitems = data.length
    const pagenumbers = []
    for (let i = 1; i <= Math.ceil(totalitems / itemsperpage); i++) {
        pagenumbers.push(i)
    }
    const currentitems = data.slice(indexOfFirstItem, indexOfLastItem)

    useEffect(() => {
        async function getData() {
            setError(false)
            setLoading(true)
            try {
                const response = await axios('https://api.giphy.com/v1/gifs/trending', { params: { api_key: 'Dst7UyI10lCaZeA9seXlAWA2qaXf0uGY', limit: 100 } })
                console.log(response)
                setData(response.data.data)
                setLoading(false)
            }
            catch (error) {
                setError(true)
                console.log(error)
            }
        }
        getData()
    }, [])

    const Search = async e => {
        e.preventDefault()
        setSearch(e.target.value)
        setError(false)
        setLoading(true)
        try {
            const response = await axios('https://api.giphy.com/v1/gifs/search', { params: { api_key: 'Dst7UyI10lCaZeA9seXlAWA2qaXf0uGY', q: search } })
            setData(response.data.data)
            setLoading(false)
        }
        catch (error) {
            setError(true)
            console.log(error)
        }

    }

    const pageselected = (pagenumber) => {
        setPage(pagenumber)
    }

    return (
        <div>
            <form>
                <div class="row align-items-start">
                    <div class="col"></div>
                    <div class="col">
                        <input type="text" placeholder="Search" class="form-control" value={search} onChange={Search} />
                        <br />
                    </div>
                    <div class="col"></div>
                </div>
            </form>
            {
                loading ? <div class="alert alert-success" role="alert">Loading</div> : error ? <div class="alert alert-danger" role="alert">Error</div> :
                    <div className="container gifs">
                        {
                            currentitems.map(Data => {
                                return (
                                    <div className="gif" key={Data.id}>
                                        <img src={Data.images.fixed_height.url} />
                                    </div>
                                )
                            })
                        }
                    </div>
            }
            <div style={{ textAlign: 'right' }}>
                <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-end">
                        {
                            pagenumbers.map(number => {
                                return (
                                    <li class="page-item">
                                        <a class="page-link" onClick={() => pageselected(number)} href='#'>{number}</a>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Giphy
