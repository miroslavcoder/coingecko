import React from 'react'
// https://api.coingecko.com/api/v3/coins/${id}
function CoinDetail({ match }) {
    const { params: { id } } = match
    let url = `https://api.coingecko.com/api/v3/coins/${id}`
    return <div className="coin-container">Detail Goods</div>
}

export default CoinDetail
