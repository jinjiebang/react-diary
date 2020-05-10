import React, { Component } from 'react';
import { Modal, Toast } from 'antd-mobile'
import axios from '../utils/request'
import '../styles/diary-detail.scss'

const alert = Modal.alert
function Header(props) {
    return (
        <div className='headerWrap'>
            <span onClick={props.onClickGoback}>返回</span>
            {props.editEnable ?
                <div className='feature'>
                    <div onClick={props.onClickDelete}>
                        <svg className="icon svg-icon" aria-hidden="true">
                            <use href="#icon-shanchu" />
                        </svg>
                    </div>
                    <div onClick={props.onClickModify}>
                        <svg className="icon svg-icon" aria-hidden="true">
                            <use href="#icon-edit-fill" />
                        </svg>
                    </div>
                </div>
                : null
            }
        </div>
    )
}
class DiaryDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: {},
            id: this.props.match.params.id
        }
    }
    componentDidMount() {
        this.getDiaryDetail()
    }
    async getDiaryDetail() {
        const { id } = this.state;
        const res = await axios.get(`/diary/${id}`)
        console.log('diaryDetail', res.data)
        this.setState({
            detail: res.data
        })
    }
    onClickDelete = () => {
        const { detail } = this.state
        alert('警告⚠️', '确定要删除吗?', [
            { text: '取消', onPress: () => console.log('cancel') },
            {
                text: '确定',
                onPress: async () => {
                    await axios.delete('/diary/', {
                        data: {
                            uid: detail.uid,
                            id: detail.id
                        }
                    })
                    Toast.success('删除成功', 1, () => {
                        this.props.history.goBack()
                    })
                }
            }
        ])
    }
    onClickModify = () => {
        this.props.history.push('/writeDiary', {
            diaryDetail: this.state.detail
        })
    }
    onClickGoback = () => {
        this.props.history.goBack()
    }
    isMyDiary = () => {
        let userInfo = window.localStorage.getItem("user")
        const user = userInfo && JSON.parse(userInfo);
        const { detail } = this.state
        return user && user.id === detail.uid
    }
    render() {
        const { detail } = this.state
        return (
            <div className="contentWrap">
                <Header
                    editEnable={this.isMyDiary()}
                    onClickGoback={this.onClickGoback}
                    onClickDelete={this.onClickDelete}
                    onClickModify={this.onClickModify}
                ></Header>
                {detail.id && (
                    <div className="pad">
                        <div className="feature">
                            <div>{detail.create_time}</div>
                            <div className="ability">
                                <div className="abilityItem">
                                    <svg
                                        className="icon svg-icon abilityItemIconSvg"
                                        aria-hidden="true"
                                    >
                                        <use href="#icon-xihuanhui" />
                                    </svg>
                                    <span>{detail.favor_nums}</span>
                                </div>
                                <div className="abilityItem">
                                    <svg
                                        className="icon svg-icon abilityItemIconSvg"
                                        aria-hidden="true"
                                    >
                                        <use href="#icon-yanjing" />
                                    </svg>
                                    <span>{detail.look_nums}</span>
                                </div>
                            </div>
                        </div>
                        <div>{detail.content}</div>
                    </div>
                )}
            </div>
        )
    }
}

export default DiaryDetail;