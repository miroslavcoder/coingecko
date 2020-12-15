import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../NavBar/NavBar';
import CoinInfo from './CoinInfo';
import './CoinList.css';

function CoinList() {
    const [currency, setCurrency] = useState('krw')
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(50)
    const [coinList, setCoinList] = useState([])

    let INIT_URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&per_page=${perPage}&page=${currentPage}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`;
    useEffect(() => {
        getData(INIT_URL);
    }, [perPage,currency])

    const getData = async (url,loadMore) => {
        const result = await axios.get(url)
        const { data } = result
        let newList = data.map((coin) =>{
                return {
                    ...coin,
                    bookmark:false,
                }
                //기존 것에 새로운 것 추가해줘여ㅑ
        })
        if (loadMore) {
            setCoinList([...coinList,...newList]);
            return;
        }
        setCoinList(newList);
    }
    const optionHandler = (e) =>{
        const { target : {name,value}} = e;
        switch(name) {
            case 'currency':
                setCurrency(value);
                setCurrentPage(1);
                break;
            case 'perPage':
                setPerPage(value);
                setCurrentPage(1);
                break;
            default: //do nothing
        }
    }
    const loadMoreHandler =(e) => {
        setCurrentPage(currentPage+1);
        let loadMore = true;
        let newPage = currentPage+1;
        const LOAD_MORE_URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&per_page=${perPage}&page=${newPage}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`;
        getData(LOAD_MORE_URL,loadMore);
    }
    return (
        <div className="coin-container">
            <NavBar />
            <div className='select-div'>
                <div className='select-container'>
                    <select>
                        <option value='all'>전체보기</option>
                        <option value='bookmark'>북마크 보기</option>
                    </select>
                    <select name='currency' onChange={optionHandler} value={currency}>
                        <option value='krw'>KRW보기</option>
                        <option value='usd'>USD보기</option>
                    </select>
                    <select name='perPage' onChange={optionHandler} value={perPage}>
                        <option value='10'>10개</option>
                        <option value='30'>30개</option>
                        <option value='50'>50개</option>
                    </select>
                </div>
            </div>
            <CoinInfo coinList={coinList} currency={currency} />
            <button className='loadmore-btn' onClick={loadMoreHandler}>+더보기</button>
        </div>
    )
}

export default CoinList
