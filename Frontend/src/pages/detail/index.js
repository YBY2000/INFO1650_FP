import React, { useState,useEffect } from 'react';
import './Detail-SASS/detail_main.css';
import useRequest from '../../hooks/useRequest';
import getFakeComment from "./fakeComment";
import getFakeAttraction from "./fakeAttraction";
import { Link } from 'react-router-dom';

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
    const renderCarouselItems = () => {
        return AttractionData[0].image.map((image, index) => (
            <div className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                <img src={image} className="d-block w-100" alt="..." />
            </div>
        ));
    };

    // 渲染函数，用于生成评论部分
    const renderComments = () => {
        return (
            <div className="detail_comments_item_container" >
            </div>
        )


    };

    if (!testdata) {
        return <div>Loading...</div>; // 在数据加载时显示加载指示
    }
    const generateIndicatorButton=()=>{
        const imagenum=2;
        const divs = [];
        for (let i = 0; i < imagenum; i++) {
            divs.push(<div key={i}>Div number {i}</div>);
        }

        return {divs};
    }
    return (
        <body className="detail_body">
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
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleIndicators" v-for="num in imagenum" v-bind:data-bs-slide-to=(num-1).toString()
                                :class="{'active':num === 1}" aria-current="true" aria-label="Slide 1"></button>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    );
};

export default Detail;