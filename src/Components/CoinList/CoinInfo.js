import React, { Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom'
import { faStar as Star } from '@fortawesome/free-solid-svg-icons'
import './CoinInfo.css'

/* <FontAwesomeIcon className="full-icon" icon={Star} /> */
//detail: https://api.coingecko.com/api/v3/coins/bitcoin

function CoinInfo({ coinList, currency }) {
    console.log('coinList:',coinList)
    const changePrice =(price)=>{
        let result =price.split('').reverse()
          .map((item,index)=>{
            if (index%3===2&&index!==price.split('').length-1) {
              item=`,${item}`
            }
            return item;
          }).reverse().join('');
        return result;
    }

    const renderCoin = coinList.map((coin, index) => {
        const {price_change_percentage_1h_in_currency: price1h,
            price_change_percentage_24h_in_currency:price24h,
            price_change_percentage_7d_in_currency:price7d
            } = coin;
            console.log(price1h,price24h,price7d,'index:',index,coin)
        return(
        <tr className="coin-list-tr" key={index}>
            <td className="coin-name">
                <FontAwesomeIcon className="empty-icon" icon={faStar} />
                <Link to={`detail/${coin.id}`}>
                    <span>{coin.name}</span>
                </Link>
            </td>
            <td>
                <span>{coin.symbol}</span>
            </td>
            <td>
                <span>
                    {currency === 'krw' ? '₩' : '$'}
                    {changePrice(coin.current_price.toFixed(0))}
                </span>
            </td>
            <td className="price_percent">
                <span
                    className={price1h && price1h.toFixed(2) >= 0
                            ? 'price-up':'price-down'}
                >{price1h ? `${price1h.toFixed(2)}%`: 'No data'}
                </span>
            </td>
            <td className="price_percent">
                <span
                    className={price24h &&price24h.toFixed(2) >= 0
                            ? 'price-up': 'price-down'}
                >{price24h ?`${price24h.toFixed(2)}%`: 'No data'}
                </span>
            </td>
            <td className="price_percent">
                <span
                    className={price7d && price7d.toFixed(2) >= 0
                            ? 'price-up': 'price-down'
                    }
                >{price7d ? `${price7d.toFixed(2)}%`: 'No data'}
                </span>
            </td>
            <td>Seoul</td>
        </tr>
    )})
    return (
        <div>
            <table className="coin-list">
                <thead>
                    <tr className="coin-list-menu">
                        <th>자산</th>
                        <th>Price</th>
                        <th>1H</th>
                        <th>24H</th>
                        <th>7D</th>
                        <th>24H Volume</th>
                    </tr>
                </thead>
                <tbody>{renderCoin}</tbody>
            </table>
        </div>
    )
}

export default CoinInfo;