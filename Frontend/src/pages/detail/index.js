import React, { useState,useEffect } from 'react';
import useRequest from '../../hooks/useRequest';

const Detail = () => {
    const { request, isLoading, error } = useRequest('/user/getAll', { method: 'GET' });
    const [detailData, setDetailData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const dataList = await request();
            if (!error) {
                console.log(dataList);
            }
        };
        fetchData();
    }, []);

    const renderCarouselItems = () => {
        return detailData.images.map((image, index) => (
            <div className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                <img src={image.src} className="d-block w-100" alt="..." />
            </div>
        ));
    };

    // 渲染函数，用于生成评论部分
    const renderComments = () => {
        return detailData.comments.map((comment, index) => (
            <div className="detail_comments_item_container" key={index}>
                {/* 其他评论相关内容 */}
            </div>
        ));
    };

    if (!detailData) {
        return <div>Loading...</div>; // 在数据加载时显示加载指示
    }

    return (
        <div className="detail_main_container">
            {/* 其他 HTML 结构 */}
            <div className="detail_carousel_container" id="attraction_vue">
                {/* 轮播图部分 */}
                <div id="carouselExampleIndicators" className="carousel slide">
                    {/* ... */}
                    <div className="carousel-inner">
                        {renderCarouselItems()}
                    </div>
                    {/* 轮播图控制按钮 */}
                </div>
            </div>

            {/* 评分和信息部分 */}
            <div className="detail_rate_info_container">
                {/* ... */}
            </div>

            {/* 介绍部分 */}
            <div className="detail_intro_container">
                {/* ... */}
            </div>

            {/* 评论部分 */}
            <div className="detail_comment_container" id="comments">
                {renderComments()}
            </div>
        </div>
    );
};

export default Detail;