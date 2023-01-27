import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Header from './components/Header/Header';
import Blogs from './components/Blogs/Blogs'; 
import {
	selectBlogAuthor,
	selectBlogContent,
	selectBlogId,
	selectBlogThumbnailUrl,
	selectBlogTitle
} from './features/blogSlice';
import { login,logout } from './features/userSlice';
import { auth } from './firebase';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	from 'react-router-dom';
}

import AddBlog from './components/Blogs/AddBlog/AddBlog';
import BlogDisplay from './components/Blogs/BlogDisplay/BlogDisplay';
import { useState } from 'react';

const App = () => {
  const dispatch = useDispatch();
  const blogId = useSelector(selectBlogId);
	const blogTitle = useSelector(selectBlogTitle);
	const blogContent = useSelector(selectBlogContent);
	const blogThumbnailUrl = useSelector(selectBlogThumbnailUrl);
	const blogAuthor = useSelector(selectBlogAuthor);

	useEffect(() => {
		auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				dispatch(
					login({
						uid: authUser.uid,
						photo: authUser.photoURL,
						email: authUser.email,
						displayName: authUser.displayName
					})
				);
			} else {
				dispatch(logout());
			}
		});
	}, []);
  return (
	  <Router>
    <div className="app">
      <Header />

      <Switch>
	  <Route path={`/${blogId}/read`}>
		<BlogDisplay
			id={blogId}
			title={blogTitle}
			content={blogContent}
			thumbnailUrl={blogThumbnailUrl}
			author={blogAuthor}
		/>
      </Route>
    	<Route path='/addBlog'>
			<AddBlog />
		</Route>

		<Route exact path='/'>
			<div className='app__page'>
		    	<Blogs />
			</div>
		</Route>
	  </Switch>
    </div>
	</Router>
  );
}

function App() {
	const [like,setlike] = useState(100)
	const [dislike,setdislike] = useState(4)

	const [likeactive,setlikeactive] =useState(false)
	const [dislikeactive,setdislikeactive] =useState(false)

	function likef(){
		if(likeactive){
			setlikeactive(false)
			setlike(like-1)
		}else{
			setlikeactive(true)
			setlike(like+1)
			if(dislikeactive){
				setdislikeactive(false)
				setlike(like+1)
				setdislike(dislike-1)

			}
		}
	}
	function dislikef(){
		if(dislikeactive){
			setdislikeactive(false)
			setdislike(dislike-1)
		}else{
			setdislikeactive(true)
			setdislike(like+1)
			if(dislikeactive){
				setlikeactive(false)
				setdislike(dislike+1)
				setlike(like-1)
			}
		}

	}

	return (
		<div className="app">
			<div></div>
			<button onClick={likef} className={[likeactive?'active-like':null,'button'].join('')}>Like {like}</button>
            <button onClick={dislikef} className={[dislikeactive?'active-dislike':null,'button'].join('')}>Dislike {dislike}</button>
			<div></div>
		</div>
	)
}

export default App;
