import { useState } from 'react'
import './App.css'

function App() {
  const [inputText, setInputText] = useState('')
  const [contentList, setContentList] = useState<string[]>([])
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  // 处理输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value)
  }

  // 处理提交
  const handleSubmit = () => {
    if (inputText.trim() !== '') {
      setContentList([...contentList, inputText])
      setInputText('') // 清空输入框
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
          >
            提交
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
