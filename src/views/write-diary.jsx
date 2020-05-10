import React, { Component } from 'react';
import styled from 'styled-components';
import axios from '../utils/request'
import { TextareaItem, Toast } from 'antd-mobile'

const Wrap = styled.div`
    display:flex;
    color:#fff;
    font-size: 1.2rem;
    height: 3rem;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    background: #53a6db;
`
function Header(props) {
    return (
        <Wrap>
            <span onClick={props.onClickCancel} style={{ color: '#0e80d2' }}>取消</span>
            <span onClick={props.onClickConfirm}>发布</span>
        </Wrap>
    )
}
class WriteDiary extends Component {
    constructor(props) {
        super(props);
        this.state = { content: '' }
    }
    componentDidMount() {
        this.autoFocusInst.focus()
        if (this.props.location.state) {
            const { uid, id, content } = this.props.location.state.diaryDetail
            this.setState({
                uid,
                id,
                content
            })
        }
    }
    onClickCancel = () => {
        this.props.history.goBack()
    }
    onClickConfirm = async () => {
        const user = JSON.parse(window.localStorage.getItem('user'))
        const { id, uid, content } = this.state
        if (this.state.id) {
            await axios.put('/diary', {
                id,
                uid,
                content
            })
            Toast.success('编辑成功', 1.5, () => {
                this.props.history.goBack()
            })
        } else {
            await axios.post('/diary', {
                id: user.id,
                content
            })
            Toast.success('发布成功', 1.5, () => {
                this.props.history.goBack()
            })
        }
    }
    onChange = (content) => {
        this.setState({
            content
        })
    }
    render() {
        return (
            <div>
                <Header onClickCancel={this.onClickCancel} onClickConfirm={this.onClickConfirm}></Header>
                <TextareaItem
                    rows="16"
                    value={this.state.content}
                    placeholder="从前车马很慢书信很远一生只够爱一个人"
                    ref={el => (this.autoFocusInst = el)}
                    count="2000"
                    onChange={this.onChange}
                    autoHeight
                />
            </div>
        );
    }
}

export default WriteDiary;