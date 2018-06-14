import React, { PropTypes } from 'react';
import Task from '../containers/Task.jsx';

export default class Column extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
        // this.handleMove = this.handleMove.bind(this);
    }

    render() {
        const connectDropTarget = this.props.connectDropTarget;
        const tasks = this.props.tasks.map(task => {
            return (
                <Task
                    id={task.id}
                    task={task}
                    key={task.id}
                    storyId={this.props.id.split("_")[0]}
                />
            )
        })

        const classes = (this.props.isColumnView) ? "column col-sm-4" : "column";

        return (
            connectDropTarget(
                <div className={classes}>
                    {this.props.name}
                    <div className="task-container">
                        {tasks}
                    </div>
                </div>
            )
        );
    }
}
