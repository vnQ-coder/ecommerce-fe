import React from 'react';
import './Accordin.css';

function UserBrowseTopicComp({ title, id, guides }) {
  return (
    <div className="accordion">
      <div className="accordion-tab">
        <input id={`toggle${id}`} type="checkbox" className="accordion-toggle" name="toggle" />
        <label htmlFor={`toggle${id}`}>{title}</label>
        <div className="accordion-content d-flex flex-column">

          {
                        guides && guides.map((guide) => (
                          <a href={`user-guides#${guide.id}`} key={guide.id}>{guide.title}</a>
                        ))
                    }

        </div>
      </div>
    </div>
  );
}

export default UserBrowseTopicComp;
