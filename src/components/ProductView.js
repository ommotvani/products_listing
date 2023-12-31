// ***** start - import from packages *****
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import { useParams,  useNavigate } from 'react-router-dom'
// ***** end - import from packages *****

function ProductView() {

    // get id of product 

    const { id } = useParams()

    const [item, setItem] = useState([])


  /**
   * It fetches data from the API and sets the state of the item.
   */
    const fetchdata = async () => {
        try {
            const response = await axios(`https://dummyjson.com/products/${id}`)
            setItem([response.data])
        } catch (error) {
        }
    }

  
    /* A hook that is used for performing side effects in function components. */
    useEffect(() => {
        fetchdata()
    }, [])

    const navigate = useNavigate()

    return (
        <div>
            <div className='container'>
                <div className='row mt-5'>
                    {
                        item.map((ele) => {
                            return (
                                <Card key={ele.id} style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={ele.thumbnail} />
                                    <Card.Body>
                                        <Card.Title>{ele.title}</Card.Title>
                                        <Card.Text>
                                            {ele.description}
                                        </Card.Text>

                                    </Card.Body>
                                    <ListGroup className="list-group-flush">
                                        <ListGroup.Item>Brand:-{ele.brand}</ListGroup.Item>
                                        <ListGroup.Item>Discription:-{ele.description}</ListGroup.Item>

                                        <ListGroup.Item>Discount:-{ele.discountPercentage}</ListGroup.Item>
                                        <ListGroup.Item>Price:-{ele.price}</ListGroup.Item>
                                        <ListGroup.Item>Rating:-{ele.rating}</ListGroup.Item>
                                        <ListGroup.Item>Stock:-{ele.stock}</ListGroup.Item>
                                    </ListGroup>
                                    <Card.Body>

                                        <Button variant="primary" onClick={() => navigate('/products')} >Go Back</Button>

                                    </Card.Body>
                                </Card>
                            )

                        })
                    }

                </div>
            </div>

        </div>
    )
}

export default ProductView