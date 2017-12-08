import React from 'react';
import axios from 'axios';
import {Row, Col} from 'antd';
import NewsComments from './news_comments';


class NewsDetail extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      news: null
    }
  }
  componentWillMount(){
    // 准备工作
    let newsId = this.props.params.newsId;
    let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${newsId}`
    axios.get(url)
      .then(response => {
        let data = response.data;
        // 更新状态
        this.setState({
          news: data.pagecontent
        });
      })
      .catch(error => {
        console.log(error);
      })
  }
  render(){
    let {news} = this.state;
    return (
      <div>
        <Row>
          <Col span={1}></Col>
          <Col span={16}>
            <div dangerouslySetInnerHTML={{__html:news}}></div>
            <NewsComments newsId={this.props.params.newsId}/>
          </Col>
          <Col span={6}></Col>
          <Col span={1}></Col>
        </Row>
      </div>
    )
  }
}

export default NewsDetail;