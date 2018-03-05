import React from 'react';
import {Router, Route, Link, browserHistory} from 'react-router-dom';
import {Row,Col} from 'antd';
import {
    Menu,
    Icon,
    Tabs,
    message,
    Form,
    Input,
    Button,
    CheckBox,
    Modal
} from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class MobileHeader extends React.Component{

    constructor(){
        super();
        this.state = {
            current : "top",
            modalVisible : false,
            action : "login",
            hasLogined : false,
            userNickName : "",
            userid : 0
        };
    };
    componentWillMount(){
        if(localStorage.userid !== ''){
            this.setState({userid : localStorage.userid,userNickName : localStorage.userNickName});
            this.setState({hasLogined : true});
        }
    };
    setModalVisible(value){
        this.setState({
            modalVisible : value
        });
    };
    handleSubmit(e){
        e.preventDefault();
        var myFetchOptions = {
            method : "GET"
        };
        var formData = this.props.form.getFieldsValue();
        console.log(formData);
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action="+this.state.action
            +"&username="+formData.userName+"&password="+formData.password+"" +
            "&r_userName=" +formData.r_userName+"&r_password="+formData.r_password+"&r_confirmPassword="+formData.r_confirmPassword,myFetchOptions).
        then(response=>response.json()).then(json=>{
            this.setState({
                userNickName:json.NickUserName,
                userid:json.UserId
            });
            if(this.state.action == "login"){
                this.setState({hasLogined:true});
                localStorage.userid = json.UserId;
                localStorage.userNickName = json.NickUserName;
            }
            message.success("请求成功！");
            this.setModalVisible(false);
        });
    };
    callback(key){
        if(key == 1){
            this.setState({action : "login"});
        }else if(key == 2){
            this.setState({action : "register"});
        }
    };
    login(){
      this.setModalVisible(true);
    };
    logout(){
        localStorage.userid = '';
        localStorage.userNickName = '';
        this.setState({hasLogined : false});
    }
    render(){
        let {getFieldProps} = this.props.form;
        const userShow  = this.state.hasLogined
            ? <Link to={`/usercenter`}>
                <Icon type="inbox" />
                <Button id="exit" type="ghost" htmlType="button" onClick = {this.logout.bind(this)}><span id="exitText">退出</span></Button>
              </Link>
            : <Icon type="setting" onClick = {this.login.bind(this)} />;
        return(
            <div id="mobileHeader">
                <header>
                    <Link to={`/`}>
                        <img src="./src/images/news.png" alt="logo" />
                        <span>ReactNews</span>
                    </Link>
                    {userShow}
                </header>
                <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible} onCancel = {()=>this.setModalVisible(false)} onOk = {()=>this.setModalVisible(false)} okText="关闭">
                    <Tabs type="card" onChange = {this.callback.bind(this)}>
                        <TabPane tab="登录" key="1">
                            <Form layout="horizontal" onSubmit = {this.handleSubmit.bind(this)}>
                                <FormItem label="账户">
                                    <Input placeholder="请输入您的账号" {...getFieldProps('userName')}/>
                                </FormItem>
                                <FormItem label="密码">
                                    <Input type="password" placeholder="请输入您的密码" {...getFieldProps('password')}/>
                                </FormItem>
                                <Button type="primary" htmlType="submit">登录</Button>
                            </Form>
                        </TabPane>
                        <TabPane tab="注册" key="2">
                            <Form layout="horizontal" onSubmit = {this.handleSubmit.bind(this)}>
                                <FormItem label="账户">
                                    <Input placeholder="请输入您的账号" {...getFieldProps('r_userName')}/>
                                </FormItem>
                                <FormItem label="密码">
                                    <Input type="password" placeholder="请输入您的密码" {...getFieldProps('r_password')}/>
                                </FormItem>
                                <FormItem label="确认密码">
                                    <Input type="password" placeholder="请再次输入您的账号" {...getFieldProps('r_confirmPassword')}/>
                                </FormItem>
                                <Button type="primary" htmlType="submit">注册</Button>
                            </Form>
                        </TabPane>
                    </Tabs>
                </Modal>
            </div>
        );
    }
}

export default MobileHeader = Form.create({})(MobileHeader);