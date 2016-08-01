/**
 * Itunes search list component
 *
 * Copyright © Roman Nosov 2016
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';

function List({ data,toggles,onToggle }) {
  if (!onToggle) return (
    <ul className="nav nav-sidebar">            
      {data.map( (r, key) => (
        toggles[key]?<li key={key}>{`${r.artistName} - ${r.trackName||r.collectionName||r.wrapperType}`}</li>:void 0
      ))}
      <li></li>            
    </ul>         
  );
  return(
    <ul className="media-list">
      {data.map( (r, key) => (
        <li key={key} className="media">
          <div className="media-left">
            <img className="media-object" src={r.artworkUrl60} alt="No Artwork" width="60" height="60" />
          </div>
          <div className="media-body">
            <h5 className="media-heading">{`${r.artistName}${r.collectionName?' - ' + r.collectionName:''}`}</h5>
            <span className="tag tag-pill tag-info">{r.wrapperType}</span>{ " " }            
            <span className="tag tag-pill tag-info">{r.collectionType}</span>{ " " }            
            <span className="tag tag-pill tag-info">{r.kind}</span>{ " " }
            {r.trackName}
          </div>
          <div className="media-right">
            <button 
              type="button" 
              onClick={onToggle(key)} 
              className={'btn media-object btn-outline-'+(toggles[key]?'warning':'primary')}
            >
              {toggles[key]?'Unf':'F'}avourite
            </button>            
          </div>
        </li>
      ))}
    </ul>   
  );
}

List.propTypes = { 
  data: React.PropTypes.array.isRequired,
  toggles: React.PropTypes.object.isRequired,
  onToggle: React.PropTypes.func,
};

export default List;