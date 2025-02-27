import { useState } from 'react'
import { getHealth } from './services/api'
import { isAxiosError } from 'axios'
import './App.css'

function App() {
  const [inputText, setInputText] = useState('')
  const [contentList, setContentList] = useState<string[]>([])
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 处理输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value)
  }

  // 处理提交
  const handleSubmit = async () => {
    if (inputText.trim() !== '') {
      setIsSubmitting(true)
      
      try {
        // 使用我们的API服务而不是直接使用axios
        const response = await getHealth();
        
        // 处理成功情况
        setContentList([...contentList, inputText])
        setInputText('') // 清空输入框
        console.log('数据已成功发送到API', response.data)
        
      } catch (error) {
        // 处理所有错误情况（网络错误、服务器错误等）
        if (isAxiosError(error)) {
          console.error('API请求失败:', error.response?.status || '网络错误')
          alert(error.response ? `提交失败: ${error.response.status}` : '网络错误，请检查连接')
        } else {
          console.error('发生未知错误:', error)
          alert('发生未知错误，请稍后再试')
        }
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  // 处理列表项点击
  const handleItemClick = (index: number) => {
    setSelectedIndex(index)
  }

  return (
    <div className="app-container">
      <div className="idea-lable">idea</div>
      
      <div className="content-area">
        {/* 中间区域: 左侧列表和右侧详情 */}
        <div className="content-container">
          <div className="content-list">
            {contentList.map((content, index) => (
              <div 
                key={index} 
                className={`content-item ${selectedIndex === index ? 'selected' : ''}`}
                onClick={() => handleItemClick(index)}
              >
                <div className="item-icon">
                  <img src="/src/icon/lamp.png" alt="Icon" width="25" height="25" />
                </div>
                <div className="item-content">{content}</div>
              </div>
            ))}
          </div>
          
          <div className="content-detail">
            {selectedIndex !== null && contentList[selectedIndex] ? (
              <div className="detail-content">
                <h3>详细内容</h3>
                <p>{contentList[selectedIndex]}</p>
              </div>
            ) : (
              <div className="detail-placeholder">
                请从左侧列表中选择一项查看详情
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="input-area">
        <div className="input-container">
          <textarea 
            placeholder="在这里输入内容..." 
            value={inputText}
            onChange={handleInputChange}
          />
          <button 
            className="submit-button" 
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? '提交中...' : '提交'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
