import React, { Component } from 'react';
import {Tabs,Card,message,Icon} from 'antd';
const TabPane = Tabs.TabPane;
class Tab extends Component {
    newTabIndex = 0;
    constructor(props) {
        super(props);
        this.state = { 
            
         };
    }
    handleChange=(key)=>{
        message.success(`${key}success`);
    }
    componentWillMount(){
        let panes = [
            {
                title:"Tab1",
                key:"1",
                content:"Tab1 Content"
            },
            {
                title:"Tab2",
                key:"2",
                content:"Tab2 Content"
            },
            {
                title:"Tab3",
                key:"3",
                content:"Tab3 Content"
            },
        ];
        this.setState({
            activeKey:panes[0].key,
            panes
        })
    }
    onChange = (activeKey) => {
        this.setState({ activeKey });
      }
    onEdit = (targetKey, action) => {
        this[action](targetKey);
      }
    
      add = () => {
        const panes = this.state.panes;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: activeKey, content: 'Content of new Tab', key: activeKey });
        this.setState({ panes, activeKey });
      }
    // targetKey 当前要删除的元素的key
      remove = (targetKey) => {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
          if (pane.key === targetKey) {
            lastIndex = i - 1;
          }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
          if (lastIndex >= 0) {
            activeKey = panes[lastIndex].key;
          } else {
            activeKey = panes[0].key;
          }
        }
        this.setState({ panes, activeKey });
      }
    render() {
        return (
            <div>
                <Card title="Tab切换">
                    <Tabs defaultActiveKey="1" onChange={this.handleChange}>
                        <TabPane tab="Tab 1" key="1">Content of Tab Pane 1</TabPane>
                        <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
                        <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
                    </Tabs>
                </Card>
                <Card title="Tab带图标切换">
                    <Tabs defaultActiveKey="1" onChange={this.handleChange}>
                        <TabPane tab={<span><Icon type="apple" />Tab 1</span>} key="1">Content of Tab Pane 1</TabPane>
                        <TabPane tab={<span><Icon type="delete" />Tab 2</span>} key="2">Content of Tab Pane 2</TabPane>
                        <TabPane tab={<span><Icon type="search" />Tab 3</span>} key="3">Content of Tab Pane 3</TabPane>
                    </Tabs>
                </Card>
                <Card title="Tab切换">
                    <Tabs 
                    activeKey={this.state.activeKey} 
                    onChange={this.onChange}
                    type="editable-card" // tab带有该属性时，才能增加减少tab页
                    onEdit={this.onEdit}
                    >
                        {
                            this.state.panes.map(panel=>{
                                return <TabPane tab={panel.title} key={panel.key}>{panel.content}</TabPane>
                            })
                        }
                    </Tabs>
                </Card>
            </div>
        );
    }
}

export default Tab;