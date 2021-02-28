import React, { Fragment, useEffect, useState } from 'react';
import './styles.css';
//import { ducks } from '../../demo';
//import DuckItem from '../../DuckItem';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';

function App() {

  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => {
      console.log(response)
      setActivities(response.data)
    })
  }, [])

  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find(x => x.id === id));
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }


  function handleCreateOrEditActivity(activity: Activity)
  {
    activity.id ? setActivities([...activities.filter(x=>x.id !== activity.id),activity])
    :setActivities([...activities,{...activity,id:uuid()}])
    setEditMode(false);
    setSelectedActivity(activity);

  }


  function handleDeleteActivity(id:string)
  {
    setActivities([...activities.filter(x=>x.id !== id)])
  }

  return (
    <Fragment>

      <NavBar openForm={handleFormOpen}></NavBar>
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}  
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          ></ActivityDashboard>
      </Container>



      {/*<Header as = 'h2' icon='users' content = 'Reactivities' />
         <img src={logo} className="App-logo" alt="logo" />
        {ducks.map(duck => (
          <DuckItem duck={duck} key = {duck.name}/>
        )
        )}
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */ }

    </Fragment>


  );
}

export default App;
