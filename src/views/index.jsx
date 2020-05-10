import React from 'react'
import { Tabs } from 'antd-mobile'
import styled from 'styled-components'
import Header from '../components/Header'
import DiaryList from '../components/DiaryList'
import axios from '../utils/request'
import NoListData from '../components/NoListData'
import AddButton from '../components/AddButton'
const tabs = [
    { title: '广场', sub: '1' },
    { title: '我的', sub: '2' }
]
const TabBox = styled.div`
    height:100%;
    padding-top: 1rem;
    box-sizing: border-box;
`

const AddWrap = styled.div`
    position: fixed;
    bottom: 5rem;
    right: 2rem;
`
const IndexWrap = styled.div`
    height: 100%;
    display:flex;
    flex-direction:column;
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
            tabIndex: 0,
            pagecount: 10
        };
    }
    componentDidMount() {
        this.getAllDiarys(0, this.state.pagecount)
    }
    getAllDiarys = async (start = 0, count = 10) => {
        let userInfo = window.localStorage.getItem("user")
        const user = userInfo && JSON.parse(userInfo);
        if (!user) {
            this.props.history.push('/login')
            return;
        }
        const res = await axios.get("diary", {
            params: {
                uid: user.id,
                start,
                count
            }
        });
        console.log('diray data', res.data)
        if (res.data.length > 0) {
            this.setState({
                allDiarys: res.data,
            });
        }
    }
    getMyDiarys = async (start = 0, count = 10) => {
        let userInfo = window.localStorage.getItem("user")
        const user = userInfo && JSON.parse(userInfo);
        if (!user) {
            this.props.history.push('/login')
            return;
        }
        const res = await axios.get("diary/myDiary", {
            params: {
                id: user.id,
                start,
                count
            }
        });
        console.log('mydiray data', res.data)
        if (res.data.length > 0) {
            this.setState({
                myDiarys: res.data,
            });
        }
    }
    onClickDiary = (item) => {
        this.props.history.push(`diaryDetail/${item.id}`);
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

    onClickButton = () => {
        this.props.history.push('/writeDiary')
    }
    render() {
        const { pagecount } = this.state
        return (
            <IndexWrap>
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
                                pagecount={pagecount}
                                onRefresh={async (start, count) => {
                                    this.setState({ refreshing: true })
                                    await this.getAllDiarys(start, count)
                                    this.setState({ refreshing: false })
                                }}
                            ></DiaryList> : <NoListData></NoListData>
                    }</TabBox>
                    <TabBox>{
                        this.state.myDiarys.length > 0 ?
                            <DiaryList
                                list={this.state.myDiarys}
                                onClickDiary={this.onClickDiary}
                                onClickFavor={this.onClickFavor}
                                pagecount={pagecount}
                                onRefresh={async (start, count) => {
                                    this.setState({ refreshing: true })
                                    await this.getMyDiarys(start, count)
                                    this.setState({ refreshing: false })
                                }}
                            ></DiaryList> : <NoListData></NoListData>
                    }</TabBox>
                </Tabs>
                <AddWrap>
                    <AddButton onClickButton={this.onClickButton}></AddButton>
                </AddWrap>
            </IndexWrap>
        )
    }
}

export default Index