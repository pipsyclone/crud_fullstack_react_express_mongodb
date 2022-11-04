import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {

    const navigate = useNavigate()
    const [product, setProduct] = useState({
        productName : "",
        productPrice : "",
        productStock : ""
    })

    const handleChange = (e) => {
        setProduct((prevState) => {
            return {
                ...prevState, [e.target.name] : e.target.value
            }
        })
    }

    const insertProduct = async (e) => {
        e.preventDefault()

        try {
            await axios.post('https://server-crud-fullstack.herokuapp.com/product/insert', {
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
                    <h3>Add Product</h3>
                    <hr />
                    <form onSubmit={insertProduct}>
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
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddProduct;