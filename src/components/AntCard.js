import React, { Component } from 'react';

import { Card } from 'antd';

// icons
import {
    // StarOutlined,
    StarFilled
} from '@ant-design/icons';

export default class AntCard extends Component{

    render(){
        // console.log(this.props.item)

        const {title, poster_path, overview, release_date, genre_ids,vote_average } = this.props.item

        const poster = `https://image.tmdb.org/t/p/original${poster_path}`

        return(
            <Card
                className="ant-card"
                hoverable
                cover={<img alt="example" src={poster}/>}>
            <div className="ant-card-body_rating">6.6</div>
            <div className="ant-card-body_title">{title}</div>
            <div className="ant-card-body_data">March 5, 2020</div>
            <div className="ant-card-body_genres">
                <span className="ant-card-body_genre-item">Action</span>
                <span className="ant-card-body_genre-item">Drama</span>
            </div>

            <p className="ant-card-body_text"> {overview}</p>

            <div className="ant-card-body_genre-stars">
                <StarFilled style={{ fontSize: '16px', color: '#E9D100' }}/>
                <StarFilled style={{ fontSize: '16px', color: '#E9D100' }}/>
                <StarFilled style={{ fontSize: '16px', color: '#E9D100' }}/>
                <StarFilled style={{ fontSize: '16px', color: '#DCDCDC' }}/>
                <StarFilled style={{ fontSize: '16px', color: '#DCDCDC' }}/>
                <StarFilled style={{ fontSize: '16px', color: '#DCDCDC' }}/>
                <StarFilled style={{ fontSize: '16px', color: '#DCDCDC' }}/>
                <StarFilled style={{ fontSize: '16px', color: '#DCDCDC' }}/>
                <StarFilled style={{ fontSize: '16px', color: '#DCDCDC' }}/>
                <StarFilled style={{ fontSize: '16px', color: '#DCDCDC' }}/>
            </div>
        </Card>
        )
    }
}