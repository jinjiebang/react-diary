import React from 'react'
import { Tabs } from 'antd-mobile'
// import styled from 'styled-components'
import Header from '../components/Header'
const tabs = [
    { title: '广场', sub: '1' },
    { title: '我的', sub: '2' }
]
class Index extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Tabs
                    tabs={tabs}
                    renderTab={tab => <span>{tab.title}</span>}
                >
                    <div>广场</div>
                    <div>我的</div>
                </Tabs>
            </div>
        )
    }
}

export default Index