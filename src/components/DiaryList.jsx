import React, { Component } from 'react';
import styled from 'styled-components'
const ItemWrap = styled.div`
    width: 100%;
    padding: 0 0.8rem;
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
        this.state = {}
        this.bgcolors = ["#b7c981", "#b2a69c", "#ad8dc6", "#bfb2a8", "#8d847e", "#a1807d", "#88d0c0"]
    }
    filterContent(content) {
        return content.length < 68 ? content : content.substring(0, 65) + '...';
    }
    render() {
        return (<ItemWrap>
            {this.props.list.map((item, index) => {
                return (<Item
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
                </Item>)
            })}
        </ItemWrap>);
    }
}

export default DiaryList;