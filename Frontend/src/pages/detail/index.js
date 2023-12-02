import React, { useState,useEffect } from 'react';
import './Detail-SASS/detail_main.css';
import useRequest from '../../hooks/useRequest';
import getFakeComment from "./fakeComment";
import getFakeAttraction from "./fakeAttraction";
import { Link } from 'react-router-dom';
const imagenum=2;
const fake_attraction=getFakeAttraction();
const fake_comment=getFakeComment();
const style = {
    '--bs-breadcrumb-divider': '>', // 直接设置 CSS 变量
};
const Detail = () => {
    const { request, isLoading, error } = useRequest('/user/getAll', { method: 'GET' });
    const [testdata,SetTest]=useState(null);
    const [AttractionData, setAttractionData] = useState(null);
    const [CommentData,SetCommentData]=useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const dataList = await request();
            SetTest(dataList);
            if (!error) {
                setAttractionData(fake_attraction);
                SetCommentData(fake_comment);
            }
        };
        fetchData();
    }, []);
    //showdata
    useEffect(()=>{
        if (AttractionData) {
            console.log(AttractionData); // 这里将在 AttractionData 更新后执行
        }
    },[AttractionData])
    if (!testdata) {
        return <div>Loading...</div>; // 在数据加载时显示加载指示
    }
    const generateIndicatorButton=()=>{
        const num=imagenum;
        const divs = [];
        for (let i = 0; i < num; i++) {
            divs.push(
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={i.toString()} className={i=== 0 ? 'active' : ''}
                        aria-current="true" aria-label={`Slide ${i + 1}`}></button>
            );
        }

        return divs;
    }
    const generateCarousItem=()=>{
        const num=imagenum;
        const divs = [];
        for (let i = 0; i < num; i++) {
            divs.push(
                <div className={`carousel-item ${i === 0 ? 'active' : ''}`} >
                    <img src={AttractionData[0].image[i]} className="d-block w-100" alt="..."/>
                </div>
            );
        }
        return divs
    }
    const generateStar=(attraction)=>{
        const divs=[]
        const rate=attraction.rate;
        var rounded=Math.round(parseFloat(attraction.rating));
        for(let i=1;i<=5;i++){
            if (i<=rounded){
                divs.push(
                    <span data-value={i} className="active">★</span>
                )
            }
            else{
                divs.push(
                    <span data-value={i}>☆</span>
                )
            }
        }
        return divs;
    }
    const generateRateInfoList=()=>{
        const attraction=AttractionData[0]
        const divs=[]
        divs.push(
            <li className="list-group-item d-flex justify-content-between align-items-center">
                <h1 style={{ fontWeight: 'bold' }} className="title">{attraction.name}</h1>
            </li>
        )
        divs.push(
            <li className="list-group-item d-flex justify-content-between align-items-center">
                <div className="detail_rating" style={{ fontSize: '35px' }}>
                    {generateStar(attraction)}
                </div>
                <div className="detail_score">
                    <h2><span className='detail_yellow_bold'>{attraction.rating}</span><span style={{ fontSize: '20px' }}>/5.0</span>
                    </h2>
                </div>
            </li>
        )
        divs.push(
            <li className="list-group-item d-flex justify-content-between align-items-center">
                <div className="detail_list_title">
                    <h6>Location</h6>
                </div>
                <div className="detail_list_content loc">
                    <h6>{attraction.location}</h6>
                </div>
            </li>
        )
        divs.push(
            <li className="list-group-item d-flex justify-content-between align-items-center">
                <div className="detail_list_title">
                    <h6>Open Time</h6>
                </div>
                <div className="detail_list_content time">
                    <h6>{attraction.opening_hours}</h6>
                </div>
            </li>
        )
        divs.push(
            <li className="list-group-item d-flex justify-content-between align-items-center">
                <div className="detail_list_title">
                    <h6>Official Tel.</h6>
                </div>
                <div className="detail_list_content tel">
                    <h6>{attraction.official_tel}</h6>
                </div>
            </li>
        )
        return divs;
    }
    return (
        <div className="detail_body">
            <div className="detail_main_container">
                <div className="detail_breadcrumb_container">
                    <nav style={style} aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/home">Home</Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">Library</li>
                        </ol>
                    </nav>
                </div>
                <div className="detail_pic_rate_container">
                    <div className="detail_carousel_container" id="attraction_vue">
                        <div id="carouselExampleIndicators" className="carousel slide">
                            <div className="carousel-indicators">
                                {generateIndicatorButton()}
                            </div>
                            <div className="carousel-inner">
                                {generateCarousItem()}
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                                data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                                data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                    <div className="detail_rate_info_container">
                        <ul className="list-group">
                            {generateRateInfoList()}
                        </ul>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail;