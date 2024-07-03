import React, { useCallback, useEffect, useRef, useState } from "react";
import { createSearchParams, useLocation, useNavigate, useParams } from "react-router-dom";
import { apiGetDetailProduct, apiGetProducts } from '../../apis/product';
import { BreadCrumb, Button, SelectQuantity, ProductExtraInfoItem, ProductInfo, CustomSlider } from '../../components';
import Slider from "react-slick";
import { formatMoney, renderStarFromNumber } from '../../ultils/helper';
import { productExtraInfo } from '../../ultils/constants';
import clsx from 'clsx';
import { useDispatch, useSelector } from "react-redux";
import { apiUpdateCart, apiUpdateWishlist } from "../../apis";
import { toast } from "react-toastify";
import { getInforUser } from "../../store/users/asyncActions";
import Swal from "sweetalert2";
import path from "../../ultils/path";
import { FaRegHeart } from "react-icons/fa";

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
};

const DetailProduct = ({ isQuickView, data }) => {
    const titleRef = useRef()
    const params = useParams();
    const { current } = useSelector(state => state.user)
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [relatedProduct, setRelatedProduct] = useState(null);
    const [currentImage, setCurrentImage] = useState(null);
    const [update, setUpdate] = useState(false)
    const [pid, setPid] = useState(null)
    const [category, setCategory] = useState(null)
    useEffect(() => {
        if (data) {
            setPid(data.pid)
            setCategory(data.category)
        }
        else if (params) {
            setPid(params.pid)
            setCategory(params.category)
        }
    }, [data, params]);

    const fetchProductData = async () => {
        const response = await apiGetDetailProduct(pid);
        if (response.success) {
            setProduct(response?.product)
            setCurrentImage(response.product?.imagesProduct[0])
        }
    };

    const fetchProducts = async () => {
        const response = await apiGetProducts({ category })
        if (response.success) setRelatedProduct(response.products)
    }
    useEffect(() => {
        if (pid) {
            fetchProductData();
            fetchProducts();
        }
        window.scrollTo(0, 0)
        titleRef.current.scrollIntoView({ block: 'center' })
    }, [pid]);

    useEffect(() => {
        if (pid) {
            fetchProductData();
        }
    }, [update]);

    const rerender = useCallback(() => {
        setUpdate(!update)
    }, [update])
    const handleQuantity = useCallback((number) => {
        if (!Number(number) || Number(number) < 1) {
            return
        } else setQuantity(number);
    }, [quantity]);

    const handleChangeQuantity = useCallback((flag) => {
        if (flag === 'minus' && quantity === 1) return
        if (flag === 'minus') setQuantity(prev => +prev - 1);
        if (flag === 'plus') setQuantity(prev => +prev + 1);
    }, [quantity]);

    const handleClickImage = (e, el) => {
        e.stopPropagation()
        setCurrentImage(el)
    }

    const handleAddCart = async () => {
        if (!current) return Swal.fire({
            title: 'Almost...',
            text: 'Please login first!',
            icon: 'info',
            cancelButtonText: 'Not now!',
            showCancelButton: true,
            confirmButtonText: 'Log in!'
        }).then((rs) => {
            if (rs.isConfirmed) navigate({
                pathname: `/${path.LOGIN}`,
                search: createSearchParams({ redirect: location.pathname }).toString()
            })
        })
        const response = await apiUpdateCart({ pid, quantity })
        if (response.success) {
            dispatch(getInforUser())
        }
        else toast.error(response.mes)
    }

    const handleAddWishlist = async () => {
        const response = await apiUpdateWishlist(product?._id)
        if (response.success) {
            dispatch(getInforUser())
        }
        else toast.error(response.mes)
    }
    return (
        <div className="w-full">
            {!isQuickView && <div className="h-[51px] bg-main flex justify-center items-center">
                <div ref={titleRef} className="w-main flex justify-between text-white">
                    <h3 className="font-semibold">Product</h3>
                    <BreadCrumb category={category} />
                </div>
            </div>}
            <div onClick={(e) => e.stopPropagation()} className={clsx("m-auto mt-4 flex bg-white", isQuickView ? 'max-w-[900px] gap-16 p-8' : 'w-main')}>
                <div className={clsx("w-2/5 flex flex-col gap-4", isQuickView && 'w-1/2')}>
                    <img src={currentImage} alt="product" className="h-[458px] w-[458px] object-cover border" />
                    <div className="w-[458px]">
                        <Slider className="image-slider" {...settings}>
                            {product?.imagesProduct?.map(el => (
                                <div className="px-2" key={el}>
                                    <img onClick={e => handleClickImage(e, el)} src={el} alt="sub-product" className="h-[143px] w-[143px] object-cover border cursor-pointer" />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
                <div className={clsx('w-2/5', isQuickView && 'w-1/2')}>
                    <div className="border-b">
                        <h3 className="uppercase font-semibold mb-2 text-[22px]">{product?.titleProduct}</h3>
                        <p className="text-[#7A7A7A] mb-4">{product?.subTitle}</p>
                    </div>

                    <div className="flex flex-col items-center mt-6 mb-4 gap-1">
                        <div className="flex items-center mt-6 gap-1">
                            {renderStarFromNumber(product?.ratingsProduct)?.map((el, index) => (<span key={index}>{el}</span>))}
                            <span className="text-[13px] text-gray-400">{`(${formatMoney(product?.numOfReviews)} reviews)`}</span>
                        </div>
                        <div className="mb-4">
                            <span className="italic text-main text-sm">{`(Sold: ${formatMoney(product?.productSold)})`}</span>
                        </div>

                    </div>

                    <div className="flex mt-2 mb-4 items-center">
                        {product?.saleProduct
                            ? <div className="flex gap-4 items-center">
                                <h2 className="text-[25px] font-semibold text-main">{`${formatMoney(product?.finalprice)} VNĐ`}</h2>
                                <del className="text-[20px]">{`${formatMoney(product?.price)} VNĐ`}</del>
                            </div>
                            : <h2 className="text-[25px] font-semibold text-main">{`${formatMoney(product?.price)} VNĐ`}</h2>
                        }
                    </div>

                    <div className="flex">
                        <p className="font-medium">Brand</p>
                        <p className="ml-[29px] mr-2">:</p>
                        <p className="text-gray-500">{product?.brand}</p>
                    </div>

                    <div className="flex mt-2">
                        <p className="font-medium">Weight</p>
                        <p className="ml-5 mr-2">:</p>
                        <p className="text-gray-500">{product?.weightProduct}</p>
                    </div>

                    <div className="flex mt-2">
                        <p className="font-medium">Items</p>
                        <p className="ml-[31px] mr-2">:</p>
                        <p className="text-gray-500">1</p>
                    </div>

                    <div className="flex mt-2 text-orange-400">
                        <p className="font-medium">Stock</p>
                        <p className="ml-8 mr-2">:</p>
                        <p>{`${product?.stock} products`}</p>
                    </div>

                    <div className="flex flex-col mt-8 gap-8">
                        <div className="flex gap-4 items-center">
                            <span className="font-medium">Quantity</span>
                            <SelectQuantity quantity={quantity} handleQuantity={handleQuantity} handleChangeQuantity={handleChangeQuantity} />
                            <span
                                className=" flex border w-10 h-10 cursor-pointer rounded-md items-center justify-center ml-10"
                                title="Add to Wishlist" onClick={() => handleAddWishlist()}
                            ><FaRegHeart color={current?.wishlist?.some(i => i._id === product?._id.toString()) ? 'red' : 'black'} /></span>
                        </div>
                        {product?.stock === 0
                            ? <div className="px-4 py-2 rounded-md text-white bg-gray-400 flex items-center justify-center text-semibold my-2 mt-4 w-fit">
                                Out of stock
                            </div>
                            : <Button handleOnClick={handleAddCart} >
                                Add to Cart
                            </Button>}
                    </div>

                </div>
                {!isQuickView && <div className="w-1/5 mt-[120px]">
                    {productExtraInfo.map(el => (
                        <ProductExtraInfoItem key={el.id} title={el.title} icon={el.icon} sub={el.sub} />
                    ))}
                </div>}
            </div>
            {!isQuickView && <div className="w-main m-auto mt-8 ">
                <ProductInfo totalRatings={product?.ratingsProduct} description={product?.descriptionProduct} reviews={product?.reviews} nameProduct={product?.titleProduct} productId={product?._id} rerender={rerender} />
            </div>}
            {!isQuickView && <div className="w-main m-auto mt-8">
                <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">OTHER CUSTOMERS ALSO BUY: </h3>
                <CustomSlider normal={true} products={relatedProduct} />
            </div>}
            {!isQuickView && <div className="w-full h-[100px]"></div>}
        </div>
    )
}

export default DetailProduct