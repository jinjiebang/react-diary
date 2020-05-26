import React, { Component } from 'react';
import styled from 'styled-components'
import { PullToRefresh, ListView } from 'antd-mobile'
import NoListData from '../components/NoListData'
const ItemWrap = styled.div`
    width: 100%;
    padding: 0.4rem 0.8rem;
`
const Item = styled.div`
    border-radius: 0.3rem;
    box-shadow: rgba(0, 0, 0,0.2) 0 0.1rem 0.3rem 0.2rem;
    padding: 0.8rem;
    color: #fff;
    margin-bottom: 0.8rem;
`
const ItemTitle = styled.div`
    font-size: 1.3rem;
    padding-bottom: 0.8rem;
    border-bottom: 0.05rem solid rgba(255,255,255,0.5);
`
const ItemContent = styled.div`
    padding-top: 1rem;
    font-size: 1rem;
    line-height: 1.5rem;
    margin-bottom: 0.8rem;
    display: flex;
    align-items: center;
`
const ItemFeature = styled.div`
    font-size: 0.8rem;
    display: flex;
    justify-content: space-between;
`
const ItemFavor = styled.div`
    display: flex;
    align-items: center;
`
const ItemTime = styled.div`
    display: flex;
    align-items: center;
`
const IconSvg = styled.svg`
    display: inline-block;
    margin-right: 0.2rem;
    width: 1.4rem;
    height: 1.4rem;
    margin-top: 0.1rem;
`
class DiaryList extends Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
            dataSource,
            data: [],
            useBodyScroll: false,
            isLoading: false,
            refreshing: false,
            hasMore: true,
            down: true,
        }
        this.pageNum = 0;
        this.bgcolors = ["#b7c981", "#b2a69c", "#ad8dc6", "#bfb2a8", "#8d847e", "#a1807d", "#88d0c0"]
    }
    filterContent(content) {
        return content.length < 70 ? content : content.substring(0, 67) + '...';
    }
    componentDidUpdate() {
        if (this.state.useBodyScroll) {
            document.body.style.overflow = 'auto';
        } else {
            document.body.style.overflow = 'hidden';
        }
    }
    componentDidMount() {
        this.onRefresh(true);
    }
    onEndReached = (event) => {
        if (this.state.isLoading || !this.state.hasMore) {
            return;
        }
        this.onRefresh(false)
    };
    onRefresh = async (isPullDown = true) => {
        this.setState({ refreshing: true, isLoading: true });
        if (isPullDown) {
            this.pageNum = 0;
        } else {
            this.pageNum++;
        }
        const start = this.pageNum * this.props.pageSize;
        const count = this.props.pageSize;
        let newData = await this.props.onRefresh(start, count);
        this.state.hasMore = newData.length > 0;
        let data = isPullDown ? newData : [...this.state.data, ...newData]
        this.setState({
            isLoading: false,
            refreshing: false,
            data,
            dataSource: this.state.dataSource.cloneWithRows(data)
        })
    }
    render() {
        const renderRow = (item, sectionID, index) => {
            return (<ItemWrap>
                <Item
                    style={{ backgroundColor: this.bgcolors[index % this.bgcolors.length] }}
                    key={item.id}
                    onClick={this.props.onClickDiary.bind(this, item)}
                >
                    <ItemTitle>{item.nickname}</ItemTitle>
                    <ItemContent>{this.filterContent(item.content)}</ItemContent>
                    <ItemFeature>
                        <ItemFavor>
                            <div onClick={this.props.onClickFavor.bind(this, item)}>
                                <IconSvg
                                    className="icon svg-icon"
                                    aria-hidden="true"
                                >
                                    {item.isFavor === 1 ? (<use href="#icon-xihuan" />) : (<use href="#icon-xihuanhui" />)}
                                </IconSvg>
                            </div>
                            <span>{item.favor_nums}</span>
                        </ItemFavor>
                        <ItemTime>{item.create_time}</ItemTime>
                    </ItemFeature>
                </Item>
            </ItemWrap>)
        }
        if (this.state.data.length > 0) {
            return <ListView
                key={this.state.useBodyScroll ? '0' : '1'}
                ref={el => this.lv = el}
                dataSource={this.state.dataSource}
                renderFooter={() => (<div style={{ padding: 10, textAlign: 'center' }}>
                    {this.state.isLoading ? 'Loading...' : 'Loaded'}
                </div>)}
                renderRow={renderRow}
                useBodyScroll={this.state.useBodyScroll}
                style={this.state.useBodyScroll ? {} : {
                    height: '100%',
                }}
                pullToRefresh={<PullToRefresh
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                />}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={200}
                pageSize={this.pageSize}
            />
        } else {
            return <NoListData></NoListData>
        }
    }
}

export default DiaryList;