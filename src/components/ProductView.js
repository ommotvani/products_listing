import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

import { useParams, NavLink, useNavigate } from 'react-router-dom';
function ProductView() {

    // get id of product 

    const { id } = useParams();

    const [item, setItem] = useState([])

    //fetch data by id

    const fetchdata = async () => {
        try {
            const response = await axios(`https://dummyjson.com/products/${id}`);
            setItem([response.data])
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchdata();
    }, []);

    const navigate = useNavigate()



    return (
        <div>
            <div className='container'>
                <div className='row mt-5'>
                    {
                        item.map((ele) => {
                            return (
                                <Card style={{ width: '18rem' }}>
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