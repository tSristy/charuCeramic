import React, { useState, useEffect } from 'react';

const InstagramFeed = () => {
  const [posts, setPosts] = useState([]);
  const accessToken = 'IGAAc8FV8Qo3xBZAFRtZAXd2SHhJNFVpemRVRExKWHUzcmU0bDYwWVRWbUpCYURyOUp4VGJLb1lZAZAy1nc2QwWHN1OUNSeEdOYnFMNndSSzdhU0dmMmNnc29vNHpOMXVNczJBQldVZAnNqNVZA5UTI3NWJXT05BRjA5OTV1eDBFaXRiMAZDZD';
  const apiUrl = `https://graph.instagram.com/me/media?fields=25275126222110613,caption,media_url,permalink,timestamp&access_token=${accessToken}`;

  useEffect(() => {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // The data.data array contains your posts
        if (data.data) {
          setPosts(data.data);
        }
      })
      .catch(error => console.error('Error fetching Instagram posts:', error));
  }, []); // Run only once on mount

  return (
    <div className="instagram-grid">
      {posts.map(post => (
        <div key={post.id} className="instagram-post">
          <a href={post.permalink} target="_blank" rel="noopener noreferrer">
            {post.media_type === 'IMAGE' && <img src={post.media_url} alt={post.caption} />}
            {/* Handle videos, carousels, and other media types */}
          </a>
          <p>{post.caption}</p>
        </div>
      ))}
    </div>
  );
};

export default InstagramFeed;