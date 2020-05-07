import React, { Component } from 'react';
import styled from 'styled-components';
import addIcon from '../images/addIcon.png';

const Wrap = styled.div`
    width: 3rem;
    height: 3rem;
    border-radius: 100%;
    box-shadow: rgba(0, 0, 0,0.2) 0 0.1rem 0.3rem 0.2rem;
    font-size: 1rem;
    color: #000;
    background: '#fff';
    display:table-cell;
    vertical-align: middle;
    text-align: center;
`

const Image = styled.img`
    width: 80%;
`

class AddButton extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Wrap>
                <Image src={addIcon} alt="" onClick={this.props.onClickButton}/>
            </Wrap>
        );
    }
}

export default AddButton;