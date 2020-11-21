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
                <Grid container spacing={1} className={classes.mainGrid}>
                    <Grid item xs={4} className={classes.dispNone}>
                        <AllTopics/>

                    </Grid>
                    <Grid item xs >
                        <WorkMaterials id={this.props.id}/>

                    </Grid>

                </Grid>
            </React.Fragment>
        )
    }
}
export default withStyles(useStyle)(ClassWorkTab)