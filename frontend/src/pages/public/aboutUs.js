import React from "react";
import BreadCrumb from "../../components/breadCrumb";
import { useLocation } from "react-router-dom";
import image from '../../assets/aboutUs.jpg';

const AboutUs = () => {
    const location = useLocation()
    return (
        <div className='w-full mb-16'>
            <div className="h-[51px] bg-main flex justify-center items-center mb-16">
                <div className="w-main flex justify-between text-white">
                    <h3 className='font-semibold'>About Us</h3>
                    <BreadCrumb category={location?.pathname?.replace('/', '')?.split('-')?.join(' ')} />
                </div>
            </div>
            <div className="w-main flex m-auto gap-4">
                <div className="flex flex-col gap-5 w-[50%]">
                    <h3 className="font-bold text-[36px] text-[#212529] leading-10">About The FoodTrove</h3>
                    <p className="text-[14px] text-[#7A7A7A] font-normal leading-6">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione, recusandae necessitatibus quasi incidunt alias adipisci pariatur earum iure beatae assumenda rerum quod. Tempora magni autem a voluptatibus neque.</p>
                    <p className="text-[14px] text-[#7A7A7A] font-normal leading-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut vitae rerum cum accusamus magni consequuntur architecto, ipsum deleniti expedita doloribus suscipit voluptatum eius perferendis amet!.</p>
                    <p className="text-[14px] text-[#7A7A7A] font-normal leading-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, maxime amet architecto est exercitationem optio ea maiores corporis beatae, dolores doloribus libero nesciunt qui illum? Voluptates deserunt adipisci voluptatem magni sunt sed blanditiis quod aspernatur! Iusto?</p>
                    <div className="w-full h-[140px] border rounded-md bg-[#F7F7F8] flex justify-between items-center">
                        <div className="ml-12">
                            <div className="flex">
                                <span className="text-6xl text-main font-bold">0.1</span>
                                <span className="text-[#7A7A7A] text-3xl font-bold justify-end flex flex-col mb-[2px]">k</span>
                            </div>
                            <span className="text-base text-[#212529] font-semibold">Vendors</span>
                        </div>
                        <div>
                            <div className="flex">
                                <span className="text-6xl text-main font-bold">23</span>
                                <span className="text-[#7A7A7A] text-3xl font-bold justify-end flex flex-col mb-[2px]">k</span>
                            </div>
                            <span className="text-base text-[#212529] font-semibold">Customers</span>
                        </div>
                        <div className="mr-12">
                            <div className="flex">
                                <span className="text-6xl text-main font-bold">2</span>
                                <span className="text-[#7A7A7A] text-3xl font-bold justify-end flex flex-col mb-[2px]">k</span>
                            </div>
                            <span className="text-base text-[#212529] font-semibold">Products</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-5 w-[50%] flex-auto">
                    <img src={image} alt="image" className="w-full object-contain" />
                </div>
            </div>
            <div className="w-main flex m-auto gap-6 mt-[100px]">
                <div className="flex h-[184px] flex-col bg-[#F7F7F8] justify-end items-center">
                    <div className="w-[55px] h-[0.92px] border border-[#64B496] bg-[#64B496] mb-4"></div>
                    <div className="flex flex-col items-center gap-1 mb-6">
                        <h3 className="font-semibold text-lg">Product Packing</h3>
                        <span className="text-center font-light text-sm text-[#7A7A7A] mx-8">Lorem ipsum dolor sit amet,
                            consectetur adipisicing.</span>
                    </div>
                </div>
                <div className="flex h-[184px] flex-col bg-[#F7F7F8] justify-end items-center">
                    <div className="w-[55px] h-[0.92px] border border-[#64B496] bg-[#64B496] mb-4"></div>
                    <div className="flex flex-col items-center gap-1 mb-6">
                        <h3 className="font-semibold text-lg">24X7 Support</h3>
                        <span className="text-center font-light text-sm text-[#7A7A7A] mx-8">Lorem ipsum dolor sit amet,
                            consectetur adipisicing.</span>
                    </div>
                </div>
                <div className="flex h-[184px] flex-col bg-[#F7F7F8] justify-end items-center">
                    <div className="w-[55px] h-[0.92px] border border-[#64B496] bg-[#64B496] mb-4"></div>
                    <div className="flex flex-col items-center gap-1 mb-6">
                        <h3 className="font-semibold text-lg">Delivery in 5 Days</h3>
                        <span className="text-center font-light text-sm text-[#7A7A7A] mx-8">Lorem ipsum dolor sit amet,
                            consectetur adipisicing.</span>
                    </div>
                </div>
                <div className="flex h-[184px] flex-col bg-[#F7F7F8] justify-end items-center">
                    <div className="w-[55px] h-[0.92px] border border-[#64B496] bg-[#64B496] mb-4"></div>
                    <div className="flex flex-col items-center gap-1 mb-6">
                        <h3 className="font-semibold text-lg">Payment Secure</h3>
                        <span className="text-center font-light text-sm text-[#7A7A7A] mx-8">Lorem ipsum dolor sit amet,
                            consectetur adipisicing.</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs