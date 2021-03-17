import React, { useEffect, useState } from 'react';
import PostDetail from '../PostDetail/PostDetail';

const Home = () => {
    const [post, setPost] = useState([]);
    useEffect(() => {
        const url = 'https://jsonplaceholder.typicode.com/posts'
        fetch(url)
        .then(res => res.json())
        .then(data => {
            const newData = data.slice(5, 10);
            setPost(newData)
            console.log(newData)
        })
    }, [])

    return (
        <>
            <h2>home home </h2>
            {
                post.map(posts => <PostDetail posts = {posts} key={posts.id}></PostDetail>)
            }
        </>
    );
};

export default Home;