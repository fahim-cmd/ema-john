import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {productKey} = useParams();
    const [product, setProduct] = useState({})

    useEffect(() =>{
        fetch('http://localhost:5000/products/'+ productKey)
        .then(res => res.json())
        .then(data => setProduct(data))
    }, [productKey])

    // const product = fakeData.find(pd => pd.key === productKey);

    return (
        <div>
            <h2>{productKey} detail coming soooooon............</h2>
            
                {/* // loading ? <p>loading.......</p> :  */}
                <Product showAddToCart={false} product={product}></Product>
            
        </div>
    );
};

export default ProductDetail;