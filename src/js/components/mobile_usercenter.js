import React from 'react';
import {Router, Route, Link, browserHistory} from 'react-router-dom';
import {Row,Col,Card} from 'antd';
import {
    Menu,
    Icon,
    Tabs,
    message,
    Form,
    Input,
    Button,
    CheckBox,
    Modal,
    notification,
    Upload
} from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';

export default class MobileUserCenter extends React.Component{
    constructor(){
        super();
        this.state = {
            usercollection : '',
            usercomment :'',
            previewImage : '',
            previewVisible : false
        };
    };
    componentDidMount(){
        var myFetchOptions = {
            method : 'GET'
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid="+localStorage.userid,myFetchOptions)
            .then(response=>response.json())
            .then(json=>{
                this.setState({usercollection:json});
            });
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid="+localStorage.userid,myFetchOptions)
            .then(response=>response.json())
            .then(json=>{
                this.setState({usercomment:json});
            });
    };
    handleCancel(){
        this.setState({previewVisible : false});
    };
    render(){
        const props = {
            action : 'http://newsapi.gugujiankong.com/handler.ashx',
            headers : {
                "Access-Control-Allow-Origin" : "*"
            },
            listType : 'picture-card',
            defaultFileList :[
                {
                    uid : -1,
                    name : 'xxx.png',
                    state : 'done',
                    url : "https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png",
                    thumbUrl : "https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png"
                }
            ],
            onPreview : (file)=>{
                this.setState({previewImage:file.url,previewVisible:true});
            }
        };
        const {usercollection,usercomment} = this.state;
        const usercollectionList = usercollection.length?
            usercollection.map((uc,index)=>(
                <Card key={index} title={uc.uniquekey} extra={<a href={`/12/index.html?_ijt=ip9cf2ttpl50j4o35aotj247gs/#/details/${uc.uniquekey}`}>查看</a>}>
                    <p>{uc.Title}</p>
                </Card>
            ))
            :
            '您还没有收藏任何新闻，快去收藏一些新闻吧';
        const usercommentList = usercomment.length?
            usercomment.map((comment,index)=>(
                <Card key={index} title={`于 ${comment.datetime} 评论了文章 ${comment.uniquekey}`} extra={<a href={`/12/index.html?_ijt=ip9cf2ttpl50j4o35aotj247gs/#/details/${comment.uniquekey}`}>查看文章</a>}>
                    <p>{comment.Comments}</p>
                </Card>
            ))
            :
            '您还没有发表任何评论';
        return(
            <div>
                <MobileHeader/>
                <Row>
                    <Col span={24}>
                        <Tabs>
                            <TabPane tab="我的收藏" key="1">
                                <Row>
                                    <Col span={24}>
                                        {usercollectionList}
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tab="我的评论" key="2">
                                <Row>
                                    <Col span={24}>
                                        {usercommentList}
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tab="个人设置" key="3">
                                <div class="clearfix">
                                    <Upload {...props}>
                                        <Icon type="plus"/>
                                        <div className="ant-upload-text">上传照片</div>
                                    </Upload>
                                    <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
                                        <img alt="预览" src={this.state.previewImage} />
                                    </Modal>
                                </div>
                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>
                <MobileFooter/>
            </div>
        );
    };
};