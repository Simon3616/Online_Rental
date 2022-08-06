import React from "react";
import { Form, Button, Input, Space, Checkbox, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { login, register } from "../utils";

class LoginPage extends React.Component {
    formRef = React.createRef();// 81行语句 绑定后可以返回用户写的东西
    state = {
        asHost: false,
        loading: false,
    };

    onFinish = () => {
        console.log("finish form");
    };

    handleLogin = async () => {
        const formInstance = this.formRef.current;

        try {
            await formInstance.validateFields(); //检查有没有都填
        } catch (error) {
            return;
        }

        this.setState({
            loading: true,
        });

        try {
            const { asHost } = this.state;
            const resp = await login(formInstance.getFieldsValue(true), asHost);
            this.props.handleLoginSuccess(resp.token, asHost); //通信装置 接收到传下来的值 ，反向通知父亲：token host
        } catch (error) {
            message.error(error.message);
        } finally {
            this.setState({
                loading: false,
            });
        }
    };

    handleRegister = async () => {
        const formInstance = this.formRef.current;

        try {
            await formInstance.validateFields(); // await 等result
            // await a
            // await b
            // c = 1
            // a then b then c = 1
        } catch (error) {
            return;
        }

        this.setState({
            loading: true,
        });

        try {
            await register(formInstance.getFieldsValue(true), this.state.asHost);
            message.success("Register Successfully");
        } catch (error) {
            message.error(error.message);
        } finally {
            this.setState({
                loading: false,
            });
        }
    };

    handleCheckboxOnChange = (e) => {
        this.setState({
            asHost: e.target.checked,
        });
    };

    render() {
        return (
            <div style={{ width: 500, margin: "20px auto" }}>
                <Form ref={this.formRef} onFinish={this.onFinish}>
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Username!",
                            },
                        ]}
                    >
                        <Input
                            disabled={this.state.loading}
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="Username"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Password!",
                            },
                        ]}
                    >
                        <Input.Password
                            disabled={this.state.loading}
                            placeholder="Password"
                        />
                    </Form.Item>
                </Form>
                <Space>
                    <Checkbox
                        disabled={this.state.loading}
                        checked={this.state.asHost}
                        onChange={this.handleCheckboxOnChange}
                    >
                        As Host
                    </Checkbox>
                    <Button
                        onClick={this.handleLogin}
                        disabled={this.state.loading}
                        shape="round"
                        type="primary"
                    >
                        Log in
                    </Button>
                    <Button
                        onClick={this.handleRegister}
                        disabled={this.state.loading}
                        shape="round"
                        type="primary"
                    >
                        Register
                    </Button>
                </Space>
            </div>
        );
    }
}

export default LoginPage;