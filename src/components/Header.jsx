import React from 'react'
import { Popover, NavBar, Icon } from 'antd-mobile'
import styled from 'styled-components'

const PopoverIconWrap = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
`;
const Item = Popover.Item
const myImg = src => <img src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`} className="am-icon am-icon-xs" alt="" />;
class Header extends React.Component {
    constructor() {
        super()
        this.state = {
            showOverlay: false,
            selectedValue: ''
        }
        this.onSelect = this.onSelect.bind(this)
        this.handleOverlayVisible = this.handleOverlayVisible.bind(this)
    }
    onSelect(value) {
        this.setState({
            showOverlay: false
        })
        console.log('onSelect', value)
    }
    handleOverlayVisible(value) {
        this.setState({
            showOverlay: value
        })
    }
    render() {
        return (
            <div>
                <NavBar
                    rightContent={
                        <Popover
                            mask
                            overlayClassName="fortest"
                            overlayStyle={{ color: 'currentColor' }}
                            align={{
                                overflow: { adjustY: 0, adjustX: 0 },
                                offset: [0, 0]
                            }}
                            visible={this.state.showOverlay}
                            overlay={[

                                <Item
                                    value="exit"
                                    key="1"
                                    icon={
                                        myImg("tOtXhkIWzwotgGSeptou")
                                      }
                                >
                                    退出
                                </Item>
                            ]}
                            onVisibleChange={this.handleOverlayVisible}
                            onSelect={this.onSelect}
                        >
                            <PopoverIconWrap>
                                <Icon type="ellipsis"></Icon>
                            </PopoverIconWrap>
                        </Popover>
                    }
                >
                    轻记
            </NavBar>
            </div>
        )
    }
}
export default Header