import React from 'react'
import { Tabs } from 'antd-mobile'
import styled from 'styled-components'
import Header from '../components/Header'
import DiaryList from '../components/DiaryList'
import axios from '../utils/request'
import NoListData from '../components/NoListData'
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
            isDidMyDiary: false,
            selected: "",
            tabIndex: 0
        };
    }
    componentDidMount() {
        this.getAllDiarys()
    }
    async getAllDiarys() {
        let userInfo = window.localStorage.getItem("user")
        const user = userInfo && JSON.parse(userInfo);
        if (!user) {
            this.props.history.push('/login')
            return;
        }
        const res = await axios.get("diary", {
            params: {
                uid: user.id
            }
        });
        console.log('diray data', res.data)
        this.setState({
            allDiarys: res.data,
            refreshing: false
        });
    }
    async getMyDiarys() {
        let userInfo = window.localStorage.getItem("user")
        const user = userInfo && JSON.parse(userInfo);
        if (!user) {
            this.props.history.push('/login')
            return;
        }
        const res = await axios.get("diary/myDiary", {
            params: {
                id: user.id,
                start: 0,
                count: 10
            }
        });
        console.log('mydiray data', res.data)
        this.setState({
            myDiarys: res.data,
            refreshing: false
        });
    }
    onClickDiary = () => {

    }
    onClickFavor = (item, e) => {
        e.stopPropagation()
        this.addFavor(item.id, item.uid)
    }
    async addFavor(diary_id, uid) {
        await axios.post('favor/', {
            diary_id,
            uid
        })
        const { allDiarys, myDiarys, tabIndex } = this.state
        let diaryList = tabIndex === 0 ? allDiarys.slice() : myDiarys.slice()
        diaryList.forEach(diary => {
            if (diary.id === diary_id) {
                diary.isFavor = 1;
                diary.favor_nums += 1;
            }
        })
        if (tabIndex === 0) {
            this.setState({
                allDiarys: diaryList
            })
        } else {
            this.setState({
                myDiarys: diaryList
            })
        }
    }
    onTabClick = (tab, index) => {
        if (!this.isDidMyDiary && index === 1) {
            this.getMyDiarys();
            this.isDidMyDiary = true;
        }
        this.setState({
            tabIndex: index
        })
    }
    onTabRight = () => {
        window.localStorage.removeItem('user')
        this.props.history.push('/login')
    }
    render() {
        return (
            <div>
                <Header onTabRight={this.onTabRight} />
                <Tabs
                    tabs={tabs}
                    renderTab={tab => <span>{tab.title}</span>}
                    onTabClick={this.onTabClick}
                >
                    <TabBox>{
                        this.state.allDiarys.length > 0 ?
                            <DiaryList
                                list={this.state.allDiarys}
                                onClickDiary={this.onClickDiary}
                                onClickFavor={this.onClickFavor}
                            ></DiaryList> : <NoListData></NoListData>
                    }</TabBox>
                    <TabBox>{
                        this.state.myDiarys.length > 0 ?
                            <DiaryList
                                list={this.state.myDiarys}
                                onClickDiary={this.onClickDiary}
                                onClickFavor={this.onClickFavor}
                            ></DiaryList> : <NoListData></NoListData>
                    }</TabBox>
                </Tabs>
            </div>
        )
    }
}

export default Index