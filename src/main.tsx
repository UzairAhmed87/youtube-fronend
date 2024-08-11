import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LikeVideos from "./page/LikeVideos.tsx"
import AllVideo from "./compount/AllVideo.tsx"
import { Provider } from 'react-redux';
import store from './store/store.ts';
import NavBar from './compount/NavBar.tsx';
import WatchVideo from './compount/WatchVideo.tsx';
import Signup from "./page/Signup.tsx"
import PublishVideo from './page/PublishVideo.tsx';
import Signin from './page/Signin.tsx';
import Profile from "./page/Profile.tsx"
import WatchHistory from './compount/Profiles/WatchHistory.tsx';
import AuthLayout from './compount/AuthLayout.tsx';
import ChannalProfile from './compount/Profiles/ChannalProfile.tsx';
import ShowTweet from "./compount/tweet/ShowTweet.tsx"
import Home from "./page/Home.tsx"
const router = createBrowserRouter([
  {
    path: "/",
    element:    <App/>,
   children:[
    {
      path:"/",
      element:<Home/>
    },
    {
      path:"/watch/:videoId",
      element:<WatchVideo/>
    },
    {
      path:"/signup",
      element:<Signup/>
    },
    {
      path:"/signin",
      element:<Signin/>
    },
    {
      path:"/channal/profile/:username",
      element:
        <ChannalProfile/>
   
    },
    {
      path:"/publishvideo",
      element:<AuthLayout>
        <PublishVideo/>
      </AuthLayout>       
    },
    {
      path:"/profile/:username",
      element:<AuthLayout>
        <Profile/>
      </AuthLayout>
    },
    
      {
        path:"/watchhistory",
        element:<AuthLayout>
          <WatchHistory/>
        </AuthLayout>
      },    
      {
        path:"/showtweet/:username",
        element:<AuthLayout>
          <ShowTweet/>
        </AuthLayout>
      }
      ,
      {
        path:"/likeVidoes",
        element:<AuthLayout>
          <LikeVideos/>
        </AuthLayout>
      }
      ,
  
   ]
  }


])
const rootElement = document.getElementById('root');
if(rootElement){
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <Provider store={store}>
    <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>,
  )

}