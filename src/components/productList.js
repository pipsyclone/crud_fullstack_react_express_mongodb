import { useEffect, useState } from 'react';
import axios from 'axios'
import { Link} from 'react-router-dom'
import { FormatRupiah } from '@arismun/format-rupiah';
import ReactPaginate from 'react-paginate';

const ProductList = () => {

    const [products, setProducts] = useState([])
    const [keyword, setKeyword] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = async () => {

        setLoading(true)
        await axios.get('https://server-crud-fullstack.herokuapp.com/product')
        .then((res) => {
            setLoading(false)
            setProducts(res.data)
        })
    }

    const searchProduct = async (e) => {
        e.preventDefault()
        setLoading(true)
        await axios.get('https://server-crud-fullstack.herokuapp.com/product/search/' + keyword)
        .then((res) => {
            setLoading(false)
            setProducts(res.data)
        })
    }

    const deleteProduct = async (id) => {
        try {
            await axios.delete('https://server-crud-fullstack.herokuapp.com/product/delete/' + id)
            getProducts()
        } catch (error) {
            console.log(error)
        }
    }

    // Pagination
    const data = products
    const itemsPerPage = 5
    const [currentItems, setCurrentItems] = useState(data)
    const [pageCount, setPageCount] = useState(0)
    const [itemOffset, setItemOffset] = useState(0)

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(data.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, data]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        
        setItemOffset(newOffset);
    };

    return (
        <>
            <div className="container mt-5 table-responsive">
                <div className='row'>
                    <div className='col-sm'>
                        <Link className='btn btn-primary rounded-0 mb-3' to={'/add-product'}>Add Product</Link>
                    </div>
                    

                    <div className='col-sm'>
                        <form onSubmit={searchProduct} className="input-group mb-3">
                            <input type="text" className="form-control" name={'keyword'} placeholder='Cari Produk...' value={keyword} onChange={(e) => setKeyword(e.target.value)} />
                            <button className="input-group-text btn btn-primary" id="inputGroup-sizing-sm">
                                Search
                            </button>
                        </form>
                    </div>
                </div>

                <table className='table table-sm table-bordered mx-auto text-white'>
                    <thead>
                        <tr align="center">
                            <th>ID</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            loading ?
                                <tr align="center">
                                    <th colSpan={'5'}>Loading...</th>
                                </tr>
                            :
                                data.length > 0 ?
                                    currentItems.map((product, key) => {
                                        return(
                                            <tr valign='middle' key={key} align="center">
                                                <td>{product._id}</td>
                                                <td>{product.product_name}</td>
                                                <td><FormatRupiah value={product.product_price} /></td>
                                                <td>{product.product_stock}</td>
                                                <td>
                                                    <button className="btn btn-danger m-2" onClick={() => deleteProduct(product._id)}>Delete</button>
                                                    <Link className="btn btn-info m-2 text-white" to={ '/update-product/' + product._id }>Update</Link>
                                                </td>
                                            </tr>
                                        )
                                    })
                                :
                                    <tr align="center">
                                        <th colSpan={'5'}>Produk tidak ditemukan/tidak ada!</th>
                                    </tr>
                        }
                    </tbody>
                </table>

                {
                    pageCount <= 1 ?
                        null
                    :
                        <nav>
                            <ReactPaginate
                                breakLabel="..."
                                nextLabel=">"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                pageCount={pageCount}
                                previousLabel="<"
                                renderOnZeroPageCount={null}
                                containerClassName={'pagination justify-content-end'}
                                pageClassName={'page-item'}
                                pageLinkClassName={'page-link'}
                                nextClassName={'page-item'}
                                nextLinkClassName={'page-link'}
                                previousClassName={'page-item'}
                                previousLinkClassName={'page-link'}
                                activeClassName={'active'}
                                disabledClassName={'disabled'}
                            />
                        </nav>
                }
            </div>
        </>
    )
}

export default ProductList;