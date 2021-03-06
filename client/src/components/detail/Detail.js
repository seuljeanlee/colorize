import React, {Component} from 'react';
import DetailLeft from './DetailLeft';
import DetailRight from './DetailRight';
import AllReview from './AllReview';
import styled, { ThemeProvider } from 'styled-components';
import Comment from './Comment';
import TopReview from './TopReview';
// import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios';
import { url } from '../../config';



const Wrapper = styled.div`
    margin : 6% auto 2% auto;
    width: 80vw;
    height: 50vh;
    display: flex;
    background-color: #F4F5F9;
`
const Div = styled.div`
    margin: auto auto 2% auto ;
    width: 80vw;
    height: 30vh;
`

const ReviewDiv = styled.div`
     margin: auto auto 2% auto ;
     heigth: 100%;
     width: 80vw;
`

const HomeButton = styled.button`
    position: fixed;
    background-color:black;
    color: white;
    border: none;
    right:1%;
    bottom:1%;
    opacity: 1;
    width: 4rem;
    height: 4rem;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    &:hover {
    opacity: 0.3;
    border: none;
  }
`

const Arrow = styled.i`
    transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
    border: solid white;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 6%;
`



const scrollStepInPx = 50;

const delayInMs = 10;


class Detail extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: '',
            intervalId : 0
        }

        this.scrollStep = this.scrollStep.bind(this);
        this.scrollToTop = this.scrollToTop.bind(this);
    }

    scrollStep() {
        if (window.pageYOffset === 0) {
            clearInterval(this.state.intervalId);
        }
        window.scroll(0, window.pageYOffset - scrollStepInPx);
    }

    scrollToTop() {
        let intervalId = setInterval(this.scrollStep, delayInMs);
        this.setState({ intervalId: intervalId });
    }

    componentDidMount(){
        const token = localStorage.getItem('token')
        axios.get(`${url}/api/item/get/detail?color_id=${this.props.match.params.id}`,{headers : {'token': token}})
          .then(response => this.setState({data : response.data}))
          .catch(err => console.log(err))
    }    




    render(){
        console.log(this.props);
        
        let loginState = this.props.isLogined;
        console.log('login stsate :', this.props.isLogined)
        return (
            <div style={{ backgroundColor:'#F4F5F9', padding:'1% 0 1% 0', fontFamily: "Nanum Gothic"}}>
                <Wrapper>
                    <DetailLeft data={this.state.data}/>
                    <DetailRight data={this.state.data} id = {this.props.match.params.id}/>
                </Wrapper>
                <Div>
                    <Comment loginState={loginState} id={this.props.match.params.id}/>
                </Div>
                <ReviewDiv>
                    <TopReview id={this.props.match.params.id} />
                </ReviewDiv>
                <ReviewDiv>
                    {loginState ? <AllReview id={this.props.match.params.id}/> : <div><h2>리뷰를 보시려면 로그인 해주세요 </h2></div>}
                </ReviewDiv>
                <HomeButton onClick={this.scrollToTop}><Arrow/><br/> Top </HomeButton>
        </div>
        )
    }
}



export default Detail;