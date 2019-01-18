import React from 'react';
import './index.css';

export default function () {
  return (
    <div className="sidebar">
      <header className="sidebar__header">Lark</header>
      <div className="sidebar__body">
        <ul>
          <li>
            <span className="item-header">形状</span>
            <div></div>
          </li>
          <li>
            <span className="item-header">工具</span>
            <div></div>
          </li>
        </ul>
      </div>
    </div>
  )
}