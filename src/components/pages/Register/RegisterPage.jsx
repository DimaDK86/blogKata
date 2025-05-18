import { Card, Form, Input, Button, Checkbox, Alert } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "./authSlice";
import styles from "./RegisterPage.module.css";

const RegisterPage = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);
  const isLoading = status === "loading";

  const onFinish = async (values) => {
    try {
      await dispatch(
        registerUser({
          username: values.username,
          email: values.email,
          password: values.password,
        }),
      ).unwrap();
      navigate("/");
    } catch (err) {
      // Обработка ошибок регистрации
      if (err.username) {
        form.setFields([
          {
            name: "username",
            errors: [err.username],
          },
        ]);
      }
      if (err.email) {
        form.setFields([
          {
            name: "email",
            errors: [err.email],
          },
        ]);
      }
    }
  };

  const validatePassword = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error("Passwords do not match!"));
    },
  });

  return (
    <div className={styles.registerContainer}>
      <Card title="Create New Account" className={styles.registerCard}>
        {error && typeof error === "string" && !isLoading && (
          <Alert
            message={error}
            type="error"
            showIcon
            className={styles.alert}
          />
        )}

        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          layout="vertical"
          scrollToFirstError
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[
              { required: true, message: "Please input your username!" },
              { min: 3, message: "Username must be at least 3 characters!" },
              { max: 20, message: "Username must be maximum 20 characters!" },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Username"
              disabled={isLoading}
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"
              disabled={isLoading}
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
              { max: 40, message: "Password must be maximum 40 characters!" },
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              disabled={isLoading}
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              validatePassword,
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm Password"
              disabled={isLoading}
            />
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error("You must accept the agreement"),
                      ),
              },
            ]}
          >
            <Checkbox disabled={isLoading}>
              I have read the <a href="/agreement">agreement</a>
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading} block>
              Register
            </Button>
          </Form.Item>
        </Form>

        <div className={styles.footer}>
          Already have an account? <Link to="/login">Sign In</Link>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;
