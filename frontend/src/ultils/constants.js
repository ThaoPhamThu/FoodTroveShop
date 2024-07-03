import path from './path';
import icons from './icons';

export const navigation = [
    {
        id: 1,
        value: 'HOME',
        path: `/${path.HOME}`
    },
    {
        id: 2,
        value: 'PRODUCTS',
        path: `/${path.PRODUCTS}`
    },
    {
        id: 3,
        value: 'BLOGS',
        path: `/${path.BLOGS}`
    },
    {
        id: 4,
        value: 'ABOUT US',
        path: `/${path.ABOUT_US}`
    },
    {
        id: 5,
        value: 'FAQs',
        path: `/${path.FAQ}`
    },
]

const { RiTruckFill, RiReplyFill, IoShieldHalfSharp, FaTty } = icons
export const productExtraInfo = [
    {
        id: 1,
        title: 'Guarantee',
        sub: 'Quality Checked',
        icon: <IoShieldHalfSharp />
    },
    {
        id: 2,
        title: 'Free Shipping',
        sub: 'Free On All Products',
        icon: <RiTruckFill />
    },
    {
        id: 3,
        title: 'Free Return',
        sub: 'Within 3 Days',
        icon: <RiReplyFill />
    },
    {
        id: 4,
        title: 'Consultancy',
        sub: 'Lifetime 24/7/356',
        icon: <FaTty />
    }
]

export const productInfoTabs = [
    {
        id: 1,
        name: 'DESCRIPTION',
        content: `It's been a while since we met the last of the Mi kind. Even though the Xiaomi Mi 4 went on sale back in the summer of 2014, it succeeded in staying relevant for over 20 months and surpassed the lifespan of many competitors. Xiaomi surely took the time to make the Mi 5 worthy of the flagship series name.

        The Mi 5 was the first Xiaomi phone to be unveiled under the massive spotlight of the world's biggest mobile expo - the MWC in Barcelona. And with its stunning looks and capable performance, the Mi 5 deserved nothing less.
        
        The Xiaomi Mi 5 is instantly likeable - the new flagship comes with unbelievably thin bezels, a sharp profile, a curved back and a lightweight body - all adding to one of the most impressive exteriors a modern smartphones can hope for.
        
        Then you learn that inside there is the latest Snapdragon 820 chipset, a new 16MP camera with 4-axis optical stabilization and yet no camera hump, generous storage options, rich connectivity options, and a beefy battery. How about that?`
    },
    {
        id: 2,
        name: 'WARRANTY',
        content: `WARRANTY INFORMATION
        LIMITED WARRANTIES
        Limited Warranties are non-transferable. The following Limited Warranties are given to the original retail purchaser of the following Ashley Furniture Industries, Inc.Products:
        
        Frames Used In Upholstered and Leather Products
        Limited Lifetime Warranty
        A Limited Lifetime Warranty applies to all frames used in sofas, couches, love seats, upholstered chairs, ottomans, sectionals, and sleepers. Ashley Furniture Industries,Inc. warrants these components to you, the original retail purchaser, to be free from material manufacturing defects.`
    },
    {
        id: 3,
        name: 'DELIVERY',
        content: `PURCHASING & DELIVERY
        Before you make your purchase, it’s helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination.
        Picking up at the store
        Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition.
        Delivery
        Customers are able to pick the next available delivery day that best fits their schedule. However, to route stops as efficiently as possible, Shopify Shop will provide the time frame. Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible adult (18 years or older) will be home at that time.
        In preparation for your delivery, please remove existing furniture, pictures, mirrors, accessories, etc. to prevent damages. Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team. Shopify Shop will deliver, assemble, and set-up your new furniture purchase and remove all packing materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items. Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home. Delivery personnel are unable to remove doors, hoist furniture or carry furniture up more than 3 flights of stairs. An elevator must be available for deliveries to the 4th floor and above.`
    },
    {
        id: 4,
        name: 'PAYMENT',
        content: `PURCHASING & DELIVERY
        Before you make your purchase, it’s helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination.
        Picking up at the store
        Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition.
        Delivery
        Customers are able to pick the next available delivery day that best fits their schedule. However, to route stops as efficiently as possible, Shopify Shop will provide the time frame. Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible adult (18 years or older) will be home at that time.
        In preparation for your delivery, please remove existing furniture, pictures, mirrors, accessories, etc. to prevent damages. Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team. Shopify Shop will deliver, assemble, and set-up your new furniture purchase and remove all packing materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items. Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home. Delivery personnel are unable to remove doors, hoist furniture or carry furniture up more than 3 flights of stairs. An elevator must be available for deliveries to the 4th floor and above.`
    },
]

export const brands = ["Ogari", "NestFood", "Vinagarden", "Nestle", "FoodTrove"]

export const sorts = [
    {
        id: 1,
        value: '-productSold',
        text: 'Best selling'
    },
    {
        id: 2,
        value: '-titleProduct',
        text: 'Alphabetically, A-Z'
    },
    {
        id: 3,
        value: 'titleProduct',
        text: 'Alphabetically, Z-A'
    },
    {
        id: 4,
        value: '-price',
        text: 'Price, high to low'
    },
    {
        id: 5,
        value: 'price',
        text: 'Price, low to high'
    },
    {
        id: 6,
        value: '-createdAt',
        text: 'Date, new to old'
    },
    {
        id: 7,
        value: 'createdAt',
        text: 'Date, old to new'
    },

]

export const ratings = [
    {
        id: 1,
        text: 'Terrible'
    },
    {
        id: 2,
        text: 'Bad'
    },
    {
        id: 3,
        text: 'Neutral'
    },
    {
        id: 4,
        text: 'Good'
    },
    {
        id: 5,
        text: 'Perfect'
    },
]

const { AiOutlineDashboard, MdGroups, GrProductHunt, RiBillLine, ImBlogger, FaFirstOrderAlt } = icons
export const adminSidebar = [
    {
        id: 1,
        type: 'SINGLE',
        text: 'Dashboard',
        path: `/${path.ADMIN}/${path.DASHBOARD}`,
        icon: <AiOutlineDashboard size={20} />
    },
    {
        id: 2,
        type: 'SINGLE',
        text: 'Manage Users',
        path: `/${path.ADMIN}/${path.MANAGE_USER}`,
        icon: <MdGroups size={20} />
    },
    {
        id: 3,
        type: 'PARENT',
        text: 'Manage Products',
        icon: <GrProductHunt size={20} />,
        submenu: [
            {
                text: 'Create Product',
                path: `/${path.ADMIN}/${path.CREATE_PRODUCT}`
            },
            {
                text: 'Manage Products',
                path: `/${path.ADMIN}/${path.MANAGE_PRODUCTS}`
            }
        ]
    },
    {
        id: 4,
        type: 'SINGLE',
        text: 'Manage Orders',
        path: `/${path.ADMIN}/${path.MANAGE_ORDER}`,
        icon: <RiBillLine size={20} />
    },
    {
        id: 5,
        type: 'PARENT',
        text: 'Manage Blogs',
        icon: <ImBlogger size={20} />,
        submenu: [
            {
                text: 'Create Blog',
                path: `/${path.ADMIN}/${path.CREATE_BLOG}`
            },
            {
                text: 'Manage Blogs',
                path: `/${path.ADMIN}/${path.MANAGE_BLOGS}`
            }
        ]
    },

]

export const memberSidebar = [
    {
        id: 1,
        type: 'SINGLE',
        text: 'Information',
        path: `/${path.MEMBER}/${path.PERSONAL}`,
        icon: <AiOutlineDashboard size={20} />
    },
    {
        id: 2,
        type: 'SINGLE',
        text: 'My cart',
        path: `/${path.MEMBER}/${path.MY_CART}`,
        icon: <MdGroups size={20} />
    },
    {
        id: 3,
        type: 'SINGLE',
        text: 'Order histories',
        path: `/${path.MEMBER}/${path.HISTORY}`,
        icon: <FaFirstOrderAlt size={20} />
    },
    {
        id: 4,
        type: 'SINGLE',
        text: 'Wishlist',
        path: `/${path.MEMBER}/${path.WISHLIST}`,
        icon: <RiBillLine size={20} />
    },

]
export const roles = [
    {
        code: 'admin',
        value: 'Amin'
    },
    {
        code: 'user',
        value: 'User'
    }
]

export const blockStatus = [
    {
        code: true,
        value: 'Blocked'
    },
    {
        code: false,
        value: 'Active'
    }
]

export const brandsProduct = [
    {
        code: "Ogari",
        value: "Ogari",
    },
    {
        code: "NestFood",
        value: "NestFood",
    },
    {
        code: "Nestle",
        value: "Nestle",
    },
    {
        code: "FoodTrove",
        value: "FoodTrove",
    },
    {
        code: "Vinagarden",
        value: "Vinagarden",
    }
]

export const faqs = [
    {
        id: 1,
        text: 'What Facilities Does Your Shop Have?',
        subtext: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad voluptate doloribus eos sunt labore ea enim voluptatem, sequi voluptas rem doloremque architecto. Libero, vero natus.'
    },
    {
        id: 2,
        text: 'How Do I By A Products For My Meal?',
        subtext: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad voluptate doloribus eos sunt labore ea enim voluptatem, sequi voluptas rem doloremque architecto. Libero, vero natus.'
    },
    {
        id: 3,
        text: 'Is There Any Benefits Center In Your Shop',
        subtext: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad voluptate doloribus eos sunt labore ea enim voluptatem, sequi voluptas rem doloremque architecto. Libero, vero natus.'
    },
    {
        id: 4,
        text: 'When I Buy, Will I Get Free Shipping??',
        subtext: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad voluptate doloribus eos sunt labore ea enim voluptatem, sequi voluptas rem doloremque architecto. Libero, vero natus.'
    },
    {
        id: 5,
        text: 'What Should I Do If I Want To Exchange Goods?',
        subtext: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad voluptate doloribus eos sunt labore ea enim voluptatem, sequi voluptas rem doloremque architecto. Libero, vero natus.'
    },
    {
        id: 6,
        text: 'What Type Of Service Do You Offer?',
        subtext: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad voluptate doloribus eos sunt labore ea enim voluptatem, sequi voluptas rem doloremque architecto. Libero, vero natus.'
    },
    {
        id: 7,
        text: 'How Do I By A Products For My Meal?',
        subtext: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad voluptate doloribus eos sunt labore ea enim voluptatem, sequi voluptas rem doloremque architecto. Libero, vero natus.'
    },
]

export const paymentMethod = [
    {
        code: "Cash On Delivery",
        value: "Cash On Delivery"
    },
    {
        code: "Payment By Paypal",
        value: "Payment By Paypal"
    },
]

export const statusOrder = [
    {
        code: "Processing",
        value: "Processing"
    },
    {
        code: "Processed-Delivered",
        value: "Processed-Delivered"
    },
    {
        code: "Successful Delivery",
        value: "Successful Delivery"
    },
    {
        code: "Cancelled",
        value: "Cancelled"
    },
]
