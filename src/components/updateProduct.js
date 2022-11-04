import axios from 'axios'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {

    const navigate = useNavigate()
    const { id } = useParams()

    const [product, setProduct] = useState({
        productName : "",
        productPrice : "",
        productStock : ""
    })

    useEffect(() => {
        getProductById()
    }, [])

    const getProductById = async () => {
        const res = await axios.get('https://server-crud-fullstack.herokuapp.com/product/' + id)
        setProduct({
            productName: res.data.product_name,
            productPrice: res.data.product_price,
            productStock: res.data.product_stock,
        })
    }

    const handleChange = (e) => {
        setProduct((prevState) => {
            return {
                ...prevState, [e.target.name] : e.target.value
            }
        })
    }

    const updateProduct = async (e) => {
        e.preventDefault()

        try {
            await axios.patch('https://server-crud-fullstack.herokuapp.com/product/update/' + id, {
                product_name: product.productName,
                product_price: product.productPrice,
                product_stock: product.productStock,
            })

            navigate('/')
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className="container">
            <div className="card col-sm-5 mt-5 mx-auto">
                <div className="card-body">
                    <h3>Update Product</h3>
                    <hr />
                    <form onSubmit={updateProduct}>
                        <div className="mb-3">
                            <label>Nama Produk</label>
                            <input type={'text'} name={'productName'} className={'form-control'} placeholder={'Masukkan Nama Produk...'} value={product.productName} onChange={handleChange} />
                            <span className='text-error'></span>
                        </div>
                        <div className="mb-3">
                            <label>Harga Produk</label>
                            <input type={'number'} name={'productPrice'} className={'form-control'} placeholder={'Masukkan Harga Produk...'} value={product.productPrice} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label>Stok Produk</label>
                            <input type={'number'} name={'productStock'} className={'form-control'} placeholder={'Masukkan Stok Produk...'} value={product.productStock} onChange={handleChange} />
                        </div>

                        <button className="btn btn-success float-end rounded-0">
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateProduct;