import React, { memo, useEffect, useMemo, useState } from 'react'
import { apiGetInCome } from '../apis';
import Chart from './chart';
import { formatMoney } from '../ultils/helper';

const ChartIncome = () => {
    const [userStats, setUserStats] = useState([]);
    const MONTHS = useMemo(
        () => [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ],
        []
    );

    const fetchIncome = async () => {
        const response = await apiGetInCome()
        if (response.success) {
            response.income?.map(item => setUserStats((prev) => [
                ...prev,
                { name: MONTHS[item._id - 1], "Revenue": formatMoney(item.total) },
            ])
            )
        }

    }

    useEffect(() => {
        fetchIncome()
    }, [MONTHS])
    console.log(userStats)
    return (
        <div>
            <Chart
                data={userStats}
                title="Monthly revenue"
                grid
                dataKey="Revenue"
            />
        </div>
    )
}

export default memo(ChartIncome)