import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import Post from "../conponents/Post";

const Home = () => {
  const [post, setPost] = useState("");
  const [posts, setPosts] = useState([]);
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setPost(value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        content: post,
        date: serverTimestamp(),
      });
    } catch (e) {
      console.error("error:", e);
    }
  };
  const getPosts = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {
      const postObj = {
        ...doc.data(),
        id: doc.id,
      };
      setPosts((prev) => [postObj, ...prev]);
    });
  };
  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("date", "desc"));
    onSnapshot(q, (querySnapshot) => {
      const postArr = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(postArr);
      setPosts(postArr);
    });
  }, []);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={post}
          type="text"
          placeholder="새 포스트를 입력하세요"
          onChange={onChange}
        />
        <button type="submit">입력</button>
      </form>
      <hr />
      <h3>Post List</h3>
      <ul className="postlist">
        {posts.map((item) => (
          <Post key={item.id} postObj={item} />
        ))}
      </ul>
    </div>
  );
};

export default Home;
