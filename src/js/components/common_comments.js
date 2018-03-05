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
    notification
} from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class CommonComments extends React.Component {
    constructor() {
        super();
        this.state = {
            comments : ''
        };
    };
    componentDidMount(){
        var myFetchOptions = {
            method : 'GET'
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey="+this.props.uniquekey,myFetchOptions)
            .then(response=>response.json())
            .then(json=>{
                this.setState({comments : json});
            });
    };
    handleSubmit(e){
        e.preventDefault();
        var myFetchOptions = {
            method : 'GET'
        };
        var formdata = this.props.form.getFieldsValue();
        console.log(formdata);
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid="+localStorage.userid+"&uniquekey="+this.props.uniquekey+"&commnet="+formdata.remark,myFetchOptions)
            .then(response=>response.json())
            .then(json=>{
                this.componentDidMount();
            });
    };
    addUserCollection(){
      var myFetchOptions = {
          method : 'GET'
      };
      fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid="+localStorage.userid+"&uniquekey="+this.props.uniquekey,myFetchOptions)
          .then(response=>response.json())
          .then(json=>{
              notification['success']({message:'ReactNews提醒',description:'收藏此文章成功'});
          });
    };
    render(){
        let {getFieldDecorator} = this.props.form;
        const {comments} = this.state;
        const commentList = comments.length?
            comments.map((comment,index)=>(
                <Card key={index} title={comment.UserName} extra={<a href="#">发布于{comment.datetime}</a>}>
                    <p>{comment.Comments}</p>
                </Card>
            ))
            :'还没有评论哟'
            ;
        return (
            <div class="comment">
                <Row>
                    <Col span={24}>
                        {commentList}
                        <Form onSubmit={this.handleSubmit.bind(this)}>
                            <FormItem label="您的评论">
                                {getFieldDecorator('remark',{initialValue : ''})(<Input type="textarea" placeholder="快来评论我啊"/>)}
                            </FormItem>
                            <Button type="primary" htmlType="submit">提交</Button>
                            &nbsp;&nbsp;
                            <Button type="primary" htmlType="button" onClick = {this.addUserCollection.bind(this)}>收藏</Button>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    };
}

export default CommonComments = Form.create({})(CommonComments);