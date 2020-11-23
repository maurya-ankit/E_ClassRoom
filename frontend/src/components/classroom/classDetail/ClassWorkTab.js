import React from "react";
import Grid from "@material-ui/core/Grid";
import AllTopics from "./ClassWorkTab/AllTopics";
import WorkMaterials from "./ClassWorkTab/WorkMaterials";
import withStyles from "@material-ui/core/styles/withStyles";

const useStyle= theme=>({
    mainGrid: {
        marginTop: theme.spacing(1),
    },
    dispNone:{
        [theme.breakpoints.down('sm')]:{
            display:'none',
        }
    },
})

class ClassWorkTab extends React.Component {
    render() {
        const classes = this.props;
        return (
            <React.Fragment>
                <Grid container spacing={5} className={classes.mainGrid}>
                        {/*<AllTopics/>*/}

                        <WorkMaterials id={this.props.id}/>


                </Grid>
            </React.Fragment>
        )
    }
}
export default withStyles(useStyle)(ClassWorkTab)