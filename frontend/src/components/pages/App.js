import CustomAppBar from "../classroom/CustomAppBar";
import ClassGrid from "../classroom/ClassGrid";
import React from "react";


class App extends React.Component {
    render() {

        return (
            <div className="App">
                <CustomAppBar>
                    <ClassGrid/>
                </CustomAppBar>
            </div>
        );
    }
}

export default App;
