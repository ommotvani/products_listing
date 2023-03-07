import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import DataTable from 'react-data-table-component'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function Products() {
  const navigate = useNavigate()


  /**
   * It navigates to the product view page when the user selects a product from the dropdown.
   * @param id - The id of the product
   */
  const onchange = (id) => {
    navigate(`/products/view/${id}`)
  }


  const [post, setPost] = useState([])

  const columns = [
    {
      name: "img",
      selector: (row) => <img src={row.thumbnail} className='products_img' alt="thumbnil" />
    },
    {
      name: "title",
      selector: (row) => row.title
    },
    {
      name: "category",
      selector: (row) => row.category
    },
    {
      name: "brand",
      selector: (row) => row.brand
    },
    {
      name: "rating",
      selector: (row) => row.rating
    },
    {
      name: "price",
      selector: (row) => row.price
    },
    {
      name: "discountPercentage",
      selector: (row) => row.discountPercentage
    },
    {
      name: "action",
      cell: row => (
        <Button type="primary" onClick={() => onchange(row.id)}>viewpage</Button>
      )
    }
  ]
  useEffect(() => {
    axios.get('https://dummyjson.com/products')
      .then(response => {
        setPost(response.data.products)
      })
      .catch('error')
  }, [])

  return (
    <div>
      <Navbar />
      <DataTable paginationRowsPerPageOptions={[8, 10]} columns={columns} data={post} pagination />
    </div>
  )
}

export default Products