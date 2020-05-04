import React from 'react'
import { Tabs } from 'antd-mobile'
import styled from 'styled-components'
import Header from '../components/Header'
import DiaryList from '../components/DiaryList'
import axios from '../utils/request'
const tabs = [
    { title: '广场', sub: '1' },
    { title: '我的', sub: '2' }
]
const TabBox = styled.div`
    margin-top: 1rem;
`
class Index extends React.Component {
    constructor() {
        super();
        this.state = {
            allDiarys: [],
            myDiarys: [],
            visible: true,
            selected: "",
            tabIndex: 0
        };
    }
    componentDidMount() {
        this.getAllDiarys()
    }
    async getAllDiarys() {
        const user = window.localStorage.getItem("user") && JSON.parse(window.localStorage.getItem("user"));
        if (!user) {
            this.props.history.push('/login')
            return;
        }
        const res = await axios.get("diary", {
            params: {
                uid: user.id
            }
        });
        console.log('diray data',res.data)
        this.setState({
            allDiarys: res.data,
            refreshing: false
        });
    }
    onClickDiary() {

    }
    onClickFavor() {

    }
    render() {
        return (
            <div>
                <Header />
                <Tabs
                    tabs={tabs}
                    renderTab={tab => <span>{tab.title}</span>}
                >
                    <TabBox>{
                        this.state.allDiarys.length > 0 ?
                            <DiaryList
                                list={this.state.allDiarys}
                                onClickDiary={this.onClickDiary}
                                onClickFavor={this.onClickFavor}
                            ></DiaryList> : null
                    }</TabBox>
                    <div>我的</div>
                </Tabs>
            </div>
        )
    }
}

export default Index