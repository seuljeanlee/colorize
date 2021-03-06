import React, { Component } from 'react';
import axios from 'axios';
import AllReviews from '../review/AllReviews';
import { url } from '../../config';
import styled from 'styled-components';


const Div = styled.div`
     width: 100%;
     height: 100%;
     border: 1px solid #d9dee8;
`

class Allreview extends Component{
    constructor(){
        super()
        this.state = {
            data : ''
        }
    }


    componentDidMount() {
        const token = localStorage.getItem('token')
        axios.get(`${url}/api/review/get/list?color_id=${this.props.id}`, { headers: { 'token': token } })
            .then(response => 
                this.setState({ data: response.data })
            )
            .catch(err => console.log(err))
    }

    render(){
        return(
            <Div>
                <div>
                    전체리뷰
                </div>
                <div>
                    {this.state.data.length !== 0 ? <AllReviews id = {this.props.id} data={this.state.data}/> : <div> <h2>등록된 리뷰가 없어요</h2></div>}
                </div>
            </Div>
        )
    }

}

export default Allreview;