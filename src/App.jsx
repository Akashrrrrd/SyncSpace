import React from 'react';
import Sidebar from './Components/Sidebar/Sidebar';
import HomePage from './Components/HomePage/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProjectOverview from './Pages/ProjectOverview/ProjectOverview';
import Chat from './Pages/Chat/Chat';
import TaskManagement from './Pages/TaskManagement/TaskManagement';
import FileExplorer from './Pages/FileExplorer/FileExplorer';
import VideoConference from './Pages/VideoConference/VideoConference';
import Notifications from './Pages/Notifications/Notifications';
import VersionControl from './Pages/VersionControl/VersionControl';

const App = () => {
  return (
    <BrowserRouter>
      <Sidebar />
      <HomePage/>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/project_overview' element={<ProjectOverview />} />
        <Route path='/chat' element={<Chat/>}/>
        <Route path='/task_management' element={<TaskManagement/>}/>
        <Route path='/file_explorer' element={<FileExplorer/>}/>
        <Route path='/video_conference' element={<VideoConference/>}/>
        <Route path='/notifications' element={<Notifications/>}/>
        <Route path='/version_control' element={<VersionControl/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
