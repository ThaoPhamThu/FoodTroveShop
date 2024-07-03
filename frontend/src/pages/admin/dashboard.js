import React, { useEffect, useState } from 'react'
import { apiGetAllProducts } from '../../apis/product'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrders } from '../../store/orders/asyncActions';
import { Link } from 'react-router-dom';
import { Doughnut, Line, Radar } from "react-chartjs-2";
import { FaMoneyBillWave } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import { IoFastFood } from "react-icons/io5";
import { GrNotes } from "react-icons/gr";
import Chart from 'chart.js/auto';
import { ArcElement } from 'chart.js'
import path from '../../ultils/path';
import { apiGetUsers } from '../../apis';
import ChartIncome from '../../components/chartIncome';
Chart.register(ArcElement);


const Dashboard = () => {
    const dispatch = useDispatch();
    const [products, setProducts] = useState(null)
    const [users, setUsers] = useState(null)
    const { orders } = useSelector(state => state.orders)
    const fetchAllProducts = async () => {
        const response = await apiGetAllProducts()
        if (response.success) setProducts(response.products)
    }

    const fetchAllUsers = async () => {
        const response = await apiGetUsers()
        if (response.success) setUsers(response.users)
    }
    let outOfStock = 0;
    products?.forEach(product => {
        if (product.stock === 0) {
            outOfStock += 1;
        }
    })

    let processing = 0;
    let processed_delivered = 0;
    let successful_delivery = 0;
    let cancelled = 0;
    orders &&
        orders?.forEach((order) => {
            if (order.orderStatus === "Processing") {
                processing += 1;
            }
            if (order.orderStatus === "Processed-Delivered") {
                processed_delivered += 1;
            }
            if (order.orderStatus === "Successful Delivery") {
                successful_delivery += 1;
            }
            if (order.orderStatus === "Cancelled") {
                cancelled += 1;
            }
        });
    useEffect(() => {
        fetchAllProducts()
        fetchAllUsers()
        dispatch(getAllOrders())
    }, [dispatch])

    let totalAmountall = 0;
    orders &&
        orders?.forEach((order) => {
            if (order?.orderStatus === 'Successful Delivery') totalAmountall += order.totalPrice;
        });

    const lineState = {
        labels: ["Initial amount", "Total revenue"],
        datasets: [
            {
                label: "TOTAL REVENUE",
                backgroundColor: ["blue"],
                hoverBackgroundColor: ["rgb(197, 72, 49)"],
                data: [0, totalAmountall],
            },
        ],
    };

    const doughnutState = {
        labels: ["Out of stock", "In stock"],
        datasets: [
            {
                backgroundColor: ["#00A6B4", "#6800B4"],
                hoverBackgroundColor: ["#FF1493", "#FFD700"],
                data: [outOfStock, products?.length - outOfStock],
            },
        ],
    };

    const doughnutStateOrder = {
        labels: ["Processing", "Processed-Delivered", "Successful Delivery", "Cancelled"],
        datasets: [
            {
                backgroundColor: ["#00A6B4", "#6800B4", "#FF7F50", "#b8b72d"],
                hoverBackgroundColor: ["#FF1493", "#00FA9A", "#FFD700", "#4494e4"],
                data: [processing, processed_delivered, successful_delivery, cancelled]
            },
        ],
    };

    // radar chart
    let dairy_bakery = 0;
    let snack_spice = 0;
    let chicken_meat = 0;
    let fast_food = 0;
    let fruits_vegetable = 0;
    let juice_drinks = 0;
    products &&
        products?.forEach((product) => {
            if (product.category === "Dairy & Bakery") {
                dairy_bakery += 1;
            }
            if (product.category === "Fruits & Vegetable") {
                fruits_vegetable += 1;
            }
            if (product.category === "Snack & Spice") {
                snack_spice += 1;
            }
            if (product.category === "Juice & Drinks") {
                juice_drinks += 1;
            }
            if (product.category === "Chicken & Meat") {
                chicken_meat += 1;
            }
            if (product.category === "Fast Food") {
                fast_food += 1;
            }
        });
    const data = {
        labels: [
            'Dairy & Bakery',
            'Fruits & Vegetable',
            'Snack & Spice',
            'Juice & Drinks',
            'Chicken & Meat',
            'Fast Food',
        ],
        datasets: [{
            label: 'Category',
            data: [dairy_bakery, fruits_vegetable, snack_spice, juice_drinks, chicken_meat, fast_food],
            fill: true,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            pointBackgroundColor: 'rgb(54, 162, 235)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(54, 162, 235)'
        }]
    };
    return (
        <div className='w-full'>
            <h1 className='h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b border-b-blue-200'>
                <span>Dashboard</span>
            </h1>

            <div className=" flex flex-col gap-6 mt-8">
                <div className='flex gap-4 justify-between m-4'>
                    <div className="flex flex-col items-center bg-white py-4 gap-4 w-1/4 rounded-md relative">
                        <div className='absolute flex justify-center items-center w-[50px] h-[50px] left-2 top-[-16px] rounded-md bg-orange-400'>
                            <FaMoneyBillWave size={24} color='white' />
                        </div>
                        <span className="text-lg font-medium">Total revenue</span>
                        <span className='text-xl font-normal text-[#7A7A7A]'>{totalAmountall && totalAmountall.toLocaleString()} VNĐ</span>
                        <Link className="text-blue-500" to={`/${path.ADMIN}/${path.MANAGE_ORDER}`}>See details</Link>
                    </div>

                    <div className="flex flex-col items-center bg-white py-4 w-1/4 gap-4 rounded-md relative">
                        <div className='absolute flex justify-center items-center w-[50px] h-[50px] left-2 top-[-16px] rounded-md bg-purple-400'>
                            <IoFastFood size={24} color='white' />
                        </div>
                        <span className="text-lg font-medium">Gross product</span>
                        <span className='text-xl font-normal text-[#7A7A7A]'>{products && products.length}</span>
                        <Link className="text-blue-500" to={`/${path.ADMIN}/${path.MANAGE_PRODUCTS}`}>See details</Link>
                    </div>

                    <div className="flex flex-col items-center bg-white py-4 w-1/4 gap-4 rounded-md relative">
                        <div className='absolute flex justify-center items-center w-[50px] h-[50px] left-2 top-[-16px] rounded-md bg-green-400'>
                            <GrNotes size={20} color='white' />
                        </div>
                        <span className="text-lg font-medium">Total bill</span>
                        <span className='text-xl font-normal text-[#7A7A7A]'>{orders && orders.length}</span>
                        <Link className="text-blue-500" to={`/${path.ADMIN}/${path.MANAGE_ORDER}`}>See details</Link>
                    </div>

                    <div className="flex flex-col items-center bg-white py-4 w-1/4 gap-4 rounded-md relative">
                        <div className='absolute flex justify-center items-center w-[50px] h-[50px] left-2 top-[-16px] rounded-md bg-sky-400'>
                            <FaUserLarge size={20} color='white' />
                        </div>
                        <span className="text-lg font-medium">Users</span>
                        <span className='text-xl font-normal text-[#7A7A7A]'>{users && users?.length}</span>
                        <Link className="text-blue-500" to={`/${path.ADMIN}/${path.MANAGE_USER}`}>See details</Link>
                    </div>
                </div>

                <div className='flex flex-col gap-8'>
                    <div className='flex justify-between items-center gap-2'>
                        <div className="w-1/2 flex flex-col items-center gap-4 bg-white m-4 rounded-md">
                            {/* Doughnut Chart */}
                            <h6 className='text-xl mt-4 font-medium'>Product quantity status</h6>
                            <div className="mb-4">
                                <Doughnut data={doughnutState} />
                            </div>
                        </div>

                        <div className="w-1/2 flex flex-col items-center gap-4 bg-white m-4 rounded-md">
                            {/* Doughnut Chart */}
                            <h6 className='text-xl mt-4 font-medium'>Order Status</h6>
                            {/* Doughnut Chart */}
                            <div className="mb-4">
                                <Doughnut data={doughnutStateOrder} />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 bg-white items-center w-[1112px] m-auto rounded-md">
                        <h6 className='text-2xl mt-8 font-medium'>Total revenue</h6>
                        {/* Line chart */}
                        <div className="w-[1050px] m-auto">
                            <Line
                                data={lineState}
                            />
                        </div>
                    </div>


                    <div className='flex flex-col bg-white rounded-md w-[1112px] m-auto'>
                        <ChartIncome />
                    </div>
                    <div className='flex bg-white rounded-md w-[1112px] m-auto '>
                        <div className='w-[500px] m-auto'>
                            <Radar
                                data={data}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard