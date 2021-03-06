import { observer } from 'mobx-react-lite';
import React from 'react';
import { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import ActivityList from './ActivityList';


export default observer(function ActivityDashboard() {
    const { activityStore } = useStore();
    const { loadActivities, activityRegistry,loadingInitial } = activityStore;


    useEffect(() => {
        if (activityRegistry.size === 0) loadActivities();
    }, [activityRegistry.size,loadActivities])

    if (loadingInitial) return <LoadingComponent content='Loading app '></LoadingComponent>



    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                <h2>Activity Filters</h2>
            </Grid.Column>
        </Grid>
    );
})