import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';
import './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className="not-found">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link to="/">
            <Button type="primary">Back Home</Button>
          </Link>
        }
      />
    </div>
  );
};

export default NotFoundPage;