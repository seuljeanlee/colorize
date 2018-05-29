import React, { Component } from 'react';
import axios from 'axios';
import { url } from '../../config';
import styled from 'styled-components';
import StarRatingComponent from 'react-star-rating-component';
import like from '../../assets/Heart.png';
import Modal from 'react-modal';

const Wrapper = styled.div`
    margin : 7% auto 2% auto;
    width: 80vw;
    height: 100vh;
    background-color: #F4F5F9;
`

const Container = styled.div`
    border: 1px solid #d9dee8;
    background-color: white;
    border-radius: 5px;
    display:flex;
    width:95%;
    height: 20vh;
    margin: 1% auto;

`

const ReviewImage = styled.img`
    margin: 1vh 0 1vh 1vw;
    width: 20%;
    height: 90%;
    cursor: pointer;
`

const Info = styled.div`
    margin: 1vh 0 1vh 1vw;
    width: 20%;
    height: 90%;
`

const ReviewContent = styled.div`
    margin: 1vh 1vw 1vh 0;
    width: 60%;
    height: 70%;
    position: relative;
`

const Message = styled.textarea`
    border: none;
    resize: none;
    width: 95%;
    height: 12vh;
`

const LikeCount = styled.div`
    width: 20%
    height: 70%
    top: 20%;
    left: 90%;
    position: absolute;
`

const Like = styled.img`
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
`
const BottomContainer = styled.div`
    position: relative;
    height: 30%;
`
const Modify = styled.button`
    font-size: 0.8rem;    
    width: 7%;
    height: 50%;
    color: black;
    top: 2%;
    left: 2%;
    position: absolute
    border-radius: 50%;
    border: none;
    cursor: pointer;
    &:hover {
        background-color: RoyalBlue;
    }
`

const Delete = styled.button`
    font-size: 0.8em;    
    width: 7%;
    height: 50%;
    color: black;
    top: 2%;
    left: 10%;
    position: absolute
    border-radius: 50%;
    border: none;
    cursor: pointer;
    &:hover {
        background-color: red;
    }
`
const Cancel = styled.button`
    font-size: 0.8em;    
    width: 7%;
    height: 50%;
    color: black;
    top: 2%;
    left: 10%;
    position: absolute
    border-radius: 50%;
    border: none;
    cursor: pointer;
    &:hover {
        background-color: red;
    }
`

const UserDiv = styled.div`
    border: 1px solid black;
    width: 20%;
    height: 30%;
    border-radius:50%;
`

const Bubble = styled.div`
position: relative;
width: 98%;
height: 14vh;
padding: 0px;
background: #FFFFFF;
-webkit-border-radius: 17px;
-moz-border-radius: 17px;
border-radius: 17px;
border: #7F7F7F solid 3px;

    &::before {
content: '';
position: absolute;
border-style: solid;
border-width: 17px 17px 17px 0;
border-color: transparent #7F7F7F;
display: block;
width: 0;
z-index: 2;
left: -20px;
top: 19px;
    }
    &::after {
content: '';
position: absolute;
border-style: solid;
border-width: 15px 15px 15px 0;
border-color: transparent #FFFFFF;
display: block;
width: 0;
z-index: 3;
left: -15px;
top: 21px;
    }
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

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  },
  overlay: {
    position: 'fixed',
    zIndex: 5
  }
};

Modal.setAppElement('#root');
const scrollStepInPx = 50;
const delayInMs = 10;

class MyReviews extends Component {
  constructor(){
    super();
    this.state = {
      data : '',
      intervalId: 0,
      popupIsOpen : false,
      imagepreviewUrl : ''
    }

    this.scrollStep = this.scrollStep.bind(this);
    this.scrollToTop = this.scrollToTop.bind(this);
    this._openPopup = this._openPopup.bind(this);
    this._afterOpenPopup = this._afterOpenPopup.bind(this);
    this._closePopup = this._closePopup.bind(this);
    this._handleModify = this._handleModify.bind(this);
  }


  _handleModify = function () {
    this.setState({
      editing: !this.state.editing
    })
  }

  scrollToTop() {
    let intervalId = setInterval(this.scrollStep, delayInMs);
    this.setState({ intervalId: intervalId });
  }

  scrollStep() {
    if (window.pageYOffset === 0) {
      clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - scrollStepInPx);
  }

  _openPopup(e) {
    this.setState({
      popupIsOpen: true,
      imagepreviewUrl: e.target.src
    })
  }

  _afterOpenPopup() {
    this.subtitle.style.color = '#f00';
  }

  _closePopup() {
    this.setState({ popupIsOpen: false });
  }

  componentDidMount(){
//여기서 내가쓴 리뷰 전체모아오기
    const token = localStorage.getItem('token')
    axios.get(`${url}/api/review/get/user`, { headers: { 'token': token } })
      .then(response =>
         this.setState({ data: response.data })
        // console.log(response)
        )
      .catch(err => console.log(err))
  }

  render(){
    let popupImage = (<img src={this.state.imagepreviewUrl} style={{ width: '100%', height: '100%' }} alt='yours' />)
    console.log(this.state.data)
    return (
      <Wrapper>
        <h2> My Reviews </h2>
        {this.state.data ? this.state.data.map((item, i) => {
          return (
            <Container key={i}>
              <ReviewImage onClick={this._openPopup} src={item.photo} />
              <Info >
                <div>{item.brand}</div>
                <div>{item.name}</div>
                <div>{item.color}</div>
                <div>내 평점:</div>
                <div>
                  <StarRatingComponent
                    name="rate2"
                    editing={false}
                    value={item.rating}
                  />
                </div>
              </Info >
              <ReviewContent >
                <div style={{ textAlign: 'center' }}>
              
                  <Bubble>
                  {!this.state.editing ? 
                    <Message readOnly innerRef={ref => { this.review = ref; }}>{item.message}</Message> 
                    : <Message innerRef={ref => { this.modifyReview = ref; }}>{item.message}</Message>}
                  </Bubble>
                </div>
                <BottomContainer >
                  {!this.state.editing ? <Modify onClick={this._handleModify}>수정</Modify> : <Modify onClick={this._handleModify}>완료</Modify>}
                  {!this.state.editing ? <Delete >삭제</Delete> : <Cancel onClick={this._reviewCancel}>취소</Cancel>}
                  <LikeCount>
                    <Like src={like} />
                    {item.likes}
                  </LikeCount>
                </BottomContainer>
              </ReviewContent >
            </Container>
          )
        }) : null}
        <HomeButton onClick={this.scrollToTop}><Arrow /><br /> Top </HomeButton>
        <Modal
          isOpen={this.state.popupIsOpen}
          onAfterOpen={this._afterOpenPopup}
          onRequestClose={this._closePopup}
          style={customStyles}
          contentLabel="Image popup"
        >
          <h2 ref={subtitle => this.subtitle = subtitle}>Review Image</h2>
          <div style={{ width: '50vh' }}>{popupImage}</div>
          <button style={{ cursor: 'pointer' }} onClick={this._closePopup}>close</button>
        </Modal>
      </Wrapper>
    )
  }

}


export default MyReviews;