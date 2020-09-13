import React from 'react'
import { StateContext } from './Provider';

const connect = createState => (Component) => {
    class Connect extends React.Component {

        constructor(props, context) {
            super(props);
            debugger
            this.state = {
                slice: createState(context.getState())
            }

            context.subscribe(() => {
                debugger
                console.log("subscribed");
                debugger
                this.handleStateChange(context);
            });
        }

         handleStateChange = (context) => {
            const rootState = context.getState();
            this.setState({
                slice: createState(rootState)
            })
        }

        // componentWillMount(){
        //     this.unsubscribe();
        // }
        render() {
            debugger;
            const { dispatch } = this.context;
            const {slice} = this.state;
            return (<Component {...slice} dispatch={dispatch}></Component>)
        }
    }
    Connect.contextType = StateContext;

    return Connect
}

export default connect