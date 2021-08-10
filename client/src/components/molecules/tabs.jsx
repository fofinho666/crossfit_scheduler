import React, { useState } from "react"

const Tab = ({ label, onClick: selectTab, activeTab }) => {
  const onClick = () => { selectTab(label) }
  const className = activeTab === label ? "is-active" : "";

  return <li className={className} onClick={onClick} >
    <a>{label}</a>
  </li>
}

const Tabs = ({ children, initialTab }) => {
  const [activeTab, setActiveTab] = useState(initialTab)

  const selectTab = (label) => {
    setActiveTab(label)
  }

  return<>
    <div className="tabs is-centered">
      <ul>
        {children.map((child) => {
          const { label } = child.props;
          return <Tab
            activeTab={activeTab}
            key={label}
            label={label}
            onClick={selectTab}
          />
        })}
      </ul>
    </div>
    <div className="tab-content">
      {children.map((child) => (child.props.label === activeTab) ? child : null)}
    </div>
  </>
}

export default Tabs