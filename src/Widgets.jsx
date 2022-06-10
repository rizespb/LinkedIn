import React from 'react'
import './Widgets.css'
import InfoIcon from '@mui/icons-material/Info'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'

const Widgets = () => {
  const newsArticle = (heading, subtitle) => (
    <div className="widgets__article">
      <div className="widgets__articleLeft">
        <FiberManualRecordIcon />
      </div>

      <div className="widgets__articleRight">
        <h4>{heading}</h4>
        <p>{subtitle}</p>
      </div>
    </div>
  )

  return (
    <div className="widgets">
      <div className="widgets__header">
        <h2>LinkedIn News</h2>
        <InfoIcon />
      </div>

      {newsArticle('Very interesting story', 'Top news - 9999 readers')}
      {newsArticle('Lorem ipsum dolor', 'Top news - 353 readers')}
      {newsArticle('Voluptates at delectus expedita', 'Top news - 777 readers')}
      {newsArticle('Ratione non qui deserunt perspiciatis', 'Top news - 1055 readers')}
      {newsArticle('Ullam esse officiis vel vero', 'Top news - 33 readers')}
      {newsArticle('Sit amet consectetur adipisicing elit', 'Top news - 5737 readers')}
      {newsArticle('Omnis assumenda accusantium soluta', 'Top news - 1313 readers')}
    </div>
  )
}

export default Widgets
